package main

import (
	"bytes"
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/generative-ai-go/genai"
	_ "github.com/lib/pq" // Postgres driver
	"google.golang.org/api/option"
)

type RoastAnalysis struct {
	Name              string   `json:"name"`                // Candidate's name (if extractable)
	AIRiskPercentage  int      `json:"ai_risk_percentage"`  // 0-100% how replaceable by AI
	TechScore         int      `json:"tech_score"`          // 1-10 technical skills
	GPTOverlap        int      `json:"gpt_overlap"`         // 1-10 how much GPT could do this job
	BuzzwordBingo     int      `json:"buzzword_bingo"`      // 1-10 intensity of buzzwords
	WhatsNotTerrible  []string `json:"whats_not_terrible"`  // 3 positive points
	RedFlags          []string `json:"red_flags"`           // 3 warning signs
	Roast             string   `json:"roast"`               // Snarky summary
}

type ResumeRoaster struct {
	client *genai.Client
	db     *sql.DB
}

type ResumeAnalysisRecord struct {
	ID             int       `json:"id"`
	Name           string    `json:"name"`
	AIRisk         int       `json:"ai_risk"`
	Roast          string    `json:"roast"`
	AnalysisDate   time.Time `json:"analysis_date"`
	OriginalResume string    `json:"original_resume,omitempty"`
}

func NewResumeRoaster(apiKey string, db *sql.DB) (*ResumeRoaster, error) {
	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		return nil, fmt.Errorf("failed to create roast client: %w", err)
	}

	return &ResumeRoaster{
		client: client,
		db:     db,
	}, nil
}

func connectToPostgres() (*sql.DB, error) {
	connStr := os.Getenv("DATABASE_URL")
	if connStr == "" {
		connStr = "host=localhost port=5432 user=postgres password=postgres dbname=resume_roaster sslmode=disable"
	}

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	// Test the connection
	err = db.Ping()
	if err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	// Create table if it doesn't exist
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS resume_analyses (
			id SERIAL PRIMARY KEY,
			name TEXT,
			ai_risk INTEGER,
			roast TEXT,
			analysis_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			original_resume TEXT
		)
	`)
	if err != nil {
		return nil, fmt.Errorf("failed to create table: %w", err)
	}

	return db, nil
}

func (rr *ResumeRoaster) saveAnalysisToDB(name string, aiRisk int, roast string) error {
	_, err := rr.db.Exec(
		"INSERT INTO resume_analyses (name, ai_risk, roast) VALUES ($1, $2, $3)",
		name,
		aiRisk,
		roast,
	)
	return err
}

func (rr *ResumeRoaster) RoastResume(ctx context.Context, resumeText string) (*RoastAnalysis, error) {
	model := rr.client.GenerativeModel("gemini-1.5-flash")

	prompt := fmt.Sprintf(`
You are a snarky tech recruiter with a dark sense of humor. Your job is to roast resumes with brutal honesty and sharp wit.

Analyze the following resume and respond ONLY in **valid JSON**. No extra text, no preambles.

---

🎯 **Metrics to return**:
- "name": (string) Try to extract the candidate's name from the resume.
- "ai_risk_percentage": (int, 0-100) — How easily could AI replace this person?
- "tech_score": (int, 1-10) — Actual technical skill level.
- "gpt_overlap": (int, 1-10) — How much of this job could ChatGPT already do?
- "buzzword_bingo": (int, 1-10) — Corporate jargon and filler words overload.
- "whats_not_terrible": (array of strings) — Good things about this resume.
- "red_flags": (array of strings) — Generic, overused, or cringy things.
- "roast": (string) — A savage, two-sentence roast. Funny but workplace-appropriate.

📝 **Instructions**:
- Be sarcastic, confident, and concise.
- If unsure about "name", return "Unknown".
- Make the roast witty, not offensive.
- Output **only valid JSON** — no markdown or formatting.

📄 Resume:
%s
`, resumeText)

	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return nil, fmt.Errorf("failed to generate roast: %w", err)
	}

	if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
		return nil, fmt.Errorf("no response from roast bot")
	}

	responseText := fmt.Sprintf("%v", resp.Candidates[0].Content.Parts[0])
	responseText = strings.TrimSpace(responseText)
	responseText = strings.Trim(responseText, "`")
	if strings.HasPrefix(responseText, "json") {
		responseText = strings.TrimPrefix(responseText, "json")
		responseText = strings.TrimSpace(responseText)
	}

	var result RoastAnalysis
	if err := json.Unmarshal([]byte(responseText), &result); err != nil {
		return nil, fmt.Errorf("failed to parse roast JSON: %w, response: %s", err, responseText)
	}

	// Save to database
	err = rr.saveAnalysisToDB(result.Name, result.AIRiskPercentage, result.Roast)
	if err != nil {
		log.Printf("Failed to save analysis to DB: %v", err)
		// We'll continue even if DB save fails
	}

	log.Printf("\n🔥 NEW RESUME ROASTED 🔥\n"+
		"Name: %s\n"+
		"AI Risk: %d%%\n"+
		"Tech Score: %d/10\n"+
		"GPT Overlap: %d/10\n"+
		"Buzzword Bingo: %d/10\n"+
		"Whats Not Terrible: %v\n"+
		"Red Flags: %v\n"+
		"Roast: %s\n",
		result.Name,
		result.AIRiskPercentage,
		result.TechScore,
		result.GPTOverlap,
		result.BuzzwordBingo,
		result.WhatsNotTerrible,
		result.RedFlags,
		result.Roast)

	return &result, nil
}

func extractTextFromFile(filepath string, contentType string) (string, error) {
	content, err := os.ReadFile(filepath)
	if err != nil {
		return "", err
	}

	switch {
	case strings.Contains(contentType, "text/plain"):
		return string(content), nil
	case strings.Contains(contentType, "application/pdf"):
		// For PDF, we'll extract basic text (this is simplified)
		// In production, you'd want to use a proper PDF parser like github.com/ledongthuc/pdf
		return extractTextFromPDF(content)
	case strings.Contains(contentType, "application/msword") || 
		 strings.Contains(contentType, "application/vnd.openxmlformats-officedocument.wordprocessingml.document"):
		// For DOCX, we'll extract basic text (simplified)
		// In production, you'd want to use a proper DOCX parser
		return extractTextFromDOCX(content)
	default:
		// Try to extract as plain text
		return string(content), nil
	}
}

func extractTextFromPDF(content []byte) (string, error) {
	// This is a very basic PDF text extraction
	// For production use, implement proper PDF parsing with github.com/ledongthuc/pdf
	text := string(content)
	
	// Remove binary characters and extract readable text
	re := regexp.MustCompile(`[^\x20-\x7E\n\r\t]`)
	text = re.ReplaceAllString(text, " ")
	
	// Clean up multiple spaces
	re = regexp.MustCompile(`\s+`)
	text = re.ReplaceAllString(text, " ")
	
	return strings.TrimSpace(text), nil
}

func extractTextFromDOCX(content []byte) (string, error) {
	// This is a very basic DOCX text extraction
	// For production use, implement proper DOCX parsing with github.com/unidoc/unioffice
	text := string(content)
	
	// Remove binary characters and extract readable text
	re := regexp.MustCompile(`[^\x20-\x7E\n\r\t]`)
	text = re.ReplaceAllString(text, " ")
	
	// Clean up multiple spaces
	re = regexp.MustCompile(`\s+`)
	text = re.ReplaceAllString(text, " ")
	
	return strings.TrimSpace(text), nil
}

func main() {
	apiKey := os.Getenv("AI_API_KEY")
	if apiKey == "" {
		log.Fatal("AI_API_KEY environment variable is required")
	}

	// Connect to Postgres
	db, err := connectToPostgres()
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer db.Close()

	roaster, err := NewResumeRoaster(apiKey, db)
	if err != nil {
		log.Fatal("Failed to initialize resume roaster:", err)
	}

	r := gin.Default()

	// Configure CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization"}
	r.Use(cors.New(config))

	r.POST("/api/analyze", func(c *gin.Context) {
		// Handle file upload
		file, header, err := c.Request.FormFile("resume")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get file from request"})
			return
		}
		defer file.Close()

		// Read file content
		var buf bytes.Buffer
		if _, err := io.Copy(&buf, file); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read file"})
			return
		}

		// Create temporary file
		tempDir := os.TempDir()
		tempFile := filepath.Join(tempDir, header.Filename)
		if err := os.WriteFile(tempFile, buf.Bytes(), 0644); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save temporary file"})
			return
		}
		defer os.Remove(tempFile)

		// Extract text from file
		text, err := extractTextFromFile(tempFile, header.Header.Get("Content-Type"))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to extract text from file"})
			return
		}

		if strings.TrimSpace(text) == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "No readable text found in the file"})
			return
		}

		// Analyze with AI
		ctx := context.Background()
		result, err := roaster.RoastResume(ctx, text)
		if err != nil {
			log.Printf("Roast error: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to roast resume"})
			return
		}

		c.JSON(http.StatusOK, result)
	})

	r.GET("/api/analyses", func(c *gin.Context) {
		rows, err := db.Query("SELECT id, name, ai_risk, roast, analysis_date FROM resume_analyses ORDER BY analysis_date DESC")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch analyses"})
			return
		}
		defer rows.Close()

		var analyses []ResumeAnalysisRecord
		for rows.Next() {
			var analysis ResumeAnalysisRecord
			err := rows.Scan(&analysis.ID, &analysis.Name, &analysis.AIRisk, &analysis.Roast, &analysis.AnalysisDate)
			if err != nil {
				log.Printf("Error scanning row: %v", err)
				continue
			}
			analyses = append(analyses, analysis)
		}

		c.JSON(http.StatusOK, analyses)
	})

	r.GET("/health", func(c *gin.Context) {
		// Check database connection as part of health check
		err := db.Ping()
		if err != nil {
			c.JSON(http.StatusServiceUnavailable, gin.H{"status": "database connection failed"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": "still savage and connected"})
	})

	log.Println("🔥 Resume Roaster starting on port 8080...")
	if err := r.Run(":8080"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}