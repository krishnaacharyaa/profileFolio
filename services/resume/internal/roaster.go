package services

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"profilefolio/models/analysis"
	"profilefolio/pkg"
	"strconv"
	"time"

	"strings"
)

type ResumeRoaster struct {
	aiClient     pkg.AIClient
	analysisRepo analysis.AnalysisRepository
}

func NewResumeRoaster(aiClient pkg.AIClient, analysisRepo analysis.AnalysisRepository) *ResumeRoaster {
	return &ResumeRoaster{
		aiClient:     aiClient,
		analysisRepo: analysisRepo,
	}
}

func (r *ResumeRoaster) RoastResume(ctx context.Context, resumeText string) (*analysis.RoastAnalysis, error) {

	prompt := createRoastPrompt(resumeText)

	response, err := r.aiClient.GenerateContent(ctx, "gemini-1.5-flash", prompt)
	if err != nil {
		return nil, fmt.Errorf("failed to generate roast: %w", err)
	}

	// Clean up the response
	response = strings.TrimSpace(response)
	response = strings.Trim(response, "`")
	if strings.HasPrefix(response, "json") {
		response = strings.TrimPrefix(response, "json")
		response = strings.TrimSpace(response)
	}

	var result *analysis.RoastAnalysis
	if err := json.Unmarshal([]byte(response), &result); err != nil {
		return nil, fmt.Errorf("failed to parse roast JSON: %w, response: %s", err, response)
	}

	// Save to database
	id, err := r.saveAnalysis(ctx, result)
	if err != nil {
		log.Printf("Failed to save analysis to DB: %v", err)
		return result, err
	}

	log.Printf("\n🔥 NEW RESUME ROASTED 🔥\nName: %s\nAI Risk: %d%%\n",
		result.Name, result.AIRisk)
	result.Id = id
	return result, nil
}

func (r *ResumeRoaster) GetAnalysis(ctx context.Context, id string) (*analysis.ResumeAnalysisRecord, error) {
	// Convert string ID to int64 if needed
	idInt, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		return nil, fmt.Errorf("invalid ID format: %w", err)
	}

	record, err := r.analysisRepo.GetByID(ctx, idInt)
	if err != nil {
		if errors.Is(err, pkg.ErrItemNotFound) {
			return nil, pkg.ErrItemNotFound
		}
		return nil, fmt.Errorf("failed to get analysis: %w", err)
	}

	go func() {
		// Use a separate context with timeout to prevent hanging
		incCtx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
		defer cancel()

		if err := r.analysisRepo.IncrementViewCount(incCtx, idInt); err != nil {
			// Log the error but don't fail the request
			log.Printf("failed to increment view count: %v", err)
		}
	}()

	// Convert repository model to domain model
	return &analysis.ResumeAnalysisRecord{
		Id:        record.Id,
		Name:      record.Name,
		AIRisk:    record.AIRisk,
		Roast:     record.Roast,
		ViewCount: record.ViewCount,
		Reactions: record.Reactions,
	}, nil
}

func createRoastPrompt(resumeText string) string {
	return fmt.Sprintf(`
You are a snarky tech recruiter with zero patience for generic resumes. Roast with brutal honesty in the specific style I'll show you.

Analyze the following resume and respond ONLY in **valid JSON**. No extra text, no preambles.

---

🎯 **Metrics to return**:
- "name": (string) Try to extract the candidate's name from the resume.
- "ai_risk": (int, 0-100) — How easily could AI replace this person?
- "tech_score": (int, 1-10) — Actual technical skill level.
- "gpt_overlap": (int, 1-10) — How much of this job could ChatGPT already do?
- "buzzword_bingo": (int, 1-10) — Corporate jargon and filler words overload.
- "whats_not_terrible": (array of strings) — Positives formatted EXACTLY like:
    [concise, snarky-but-positive observation]
- "red_flags": (array of strings) — Negatives formatted EXACTLY like:
    [concise, savage observation]
- "roast": (string) — A savage, two-sentence roast. Funny but workplace-appropriate.

📝 **Style Rules**:
- "whats_not_terrible" items should sound like backhanded compliments
- "red_flags" should be specific and painful
- Never mention PDFs or file formats
- Example structure:
    "whats_not_terrible": [
        "Actually knows how to use Git (probably)",
        "Can spell 'JavaScript' correctly most of the time"
    ],
    "red_flags": [
        "Lists 'proficient in Excel' as a technical skill",
        "5 years experience, same project repeated 5 times"
    ]

📄 Resume:
%s
`, resumeText)
}

func (r *ResumeRoaster) saveAnalysis(ctx context.Context, result *analysis.RoastAnalysis) (int64, error) {
	// Create the analysis record using the repository
	id, err := r.analysisRepo.Create(ctx, &analysis.RoastAnalysis{
		Name:             result.Name,
		AIRisk:           result.AIRisk,
		TechScore:        result.TechScore,
		GPTOverlap:       result.GPTOverlap,
		BuzzwordBingo:    result.BuzzwordBingo,
		WhatsNotTerrible: result.WhatsNotTerrible,
		RedFlags:         result.RedFlags,
		Roast:            result.Roast,
	})

	if err != nil {
		return 0, fmt.Errorf("failed to save analysis to database: %w", err)
	}

	return id, nil
}

func (s *ResumeRoaster) UpdateReaction(ctx context.Context, id int64, reaction string, prevReaction string) error {

	err := s.analysisRepo.UpdateReactions(ctx, id, reaction, prevReaction)
	if err != nil {
		fmt.Printf("Error %+v", err.Error())
		return fmt.Errorf("repository error: %w", err)
	}

	return nil
}
