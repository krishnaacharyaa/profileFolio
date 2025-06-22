package analysis

import (
	"time"

	"github.com/google/uuid"
)

type RoastAnalysis struct {
	Id               uuid.UUID `json:"id"`
	Name             string    `json:"name"`               // Candidate's name (if extractable)
	AIRisk           int       `json:"ai_risk"`            // 0-100% how replaceable by AI
	TechScore        int       `json:"tech_score"`         // 1-10 technical skills
	GPTOverlap       int       `json:"gpt_overlap"`        // 1-10 how much GPT could do this job
	BuzzwordBingo    int       `json:"buzzword_bingo"`     // 1-10 intensity of buzzwords
	WhatsNotTerrible []string  `json:"whats_not_terrible"` // 3 positive points
	RedFlags         []string  `json:"red_flags"`          // 3 warning signs
	Roast            string    `json:"roast"`              // Snarky summary
}

type ResumeAnalysisRecord struct {
	Id           uuid.UUID        `json:"id"`
	Name         string           `json:"name"`
	AIRisk       int              `json:"ai_risk"`
	Roast        string           `json:"roast"`
	AnalysisDate time.Time        `json:"analysis_date"`
	ViewCount    int64            `json:"view_count"`
	Reactions    map[string]int64 `json:"reactions"`
}

type ReactionRequest struct {
	Reaction     string `json:"reaction"`
	PrevReaction string `json:"prevReaction,omitempty"`
}
