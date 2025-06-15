package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	    "github.com/google/generative-ai-go/genai"
    "google.golang.org/api/option"
)

type AnalysisResult struct {
	OverallScore    int      `json:"overall_score"`
	Strengths       []string `json:"strengths"`
	Weaknesses      []string `json:"weaknesses"`
	Suggestions     []string `json:"suggestions"`
	SkillsFound     []string `json:"skills_found"`
	ExperienceLevel string   `json:"experience_level"`
	Summary         string   `json:"summary"`
}

type ResumeAnalyzer struct {
	client *genai.Client
}

func NewResumeAnalyzer(apiKey string) (*ResumeAnalyzer, error) {
	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		return nil, fmt.Errorf("failed to create AI client: %w", err)
	}

	return &ResumeAnalyzer{client: client}, nil
}

func (ra *ResumeAnalyzer) AnalyzeResume(ctx context.Context, resumeText string) (*AnalysisResult, error) {
	model := ra.client.GenerativeModel("gemini-1.5-flash")
	
	prompt := fmt.Sprintf(`
Analyze this resume and provide a comprehensive evaluation in JSON format. The response must be valid JSON only, no additional text or formatting.

Resume text:
%s

Provide the analysis in exactly this JSON structure:
{
  "overall_score": <number between 1-10>,
  "strengths": ["strength1", "strength2", "strength3"],
  "weaknesses": ["weakness1", "weakness2", "weakness3"],
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
  "skills_found": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "experience_level": "<Junior/Mid-level/Senior/Executive>",
  "summary": "<2-sentence summary of the candidate>"
}

Focus on:
- Technical skills and competencies
- Work experience relevance
- Education background
- Resume formatting and presentation
- Missing elements that could strengthen the resume
- Career progression and achievements
`, resumeText)

	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return nil, fmt.Errorf("failed to generate content: %w", err)
	}

	if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
		return nil, fmt.Errorf("no response from Gemini")
	}

	responseText := fmt.Sprintf("%v", resp.Candidates[0].Content.Parts[0])
	
	// Clean the response to extract JSON
	responseText = strings.TrimSpace(responseText)
	responseText = strings.Trim(responseText, "`")
	if strings.HasPrefix(responseText, "json") {
		responseText = strings.TrimPrefix(responseText, "json")
		responseText = strings.TrimSpace(responseText)
	}

	var result AnalysisResult
	if err := json.Unmarshal([]byte(responseText), &result); err != nil {
		return nil, fmt.Errorf("failed to parse JSON response: %w, response: %s", err, responseText)
	}

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

	analyzer, err := NewResumeAnalyzer(apiKey)
	if err != nil {
		log.Fatal("Failed to initialize resume analyzer:", err)
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
		result, err := analyzer.AnalyzeResume(ctx, text)
		if err != nil {
			log.Printf("Analysis error: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to analyze resume"})
			return
		}

		c.JSON(http.StatusOK, result)
	})

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "healthy"})
	})

	log.Println("Server starting on port 8080...")
	if err := r.Run(":8080"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}