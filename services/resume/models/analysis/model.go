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

// Constants for reaction types
const (
	TRASH = 0 // 💩
	FIRE  = 1 // 🔥
	CLOWN = 2 // 🤡
	DEAD  = 3 // 💀
	LMAO  = 4 // 😂
)

// Reaction emoji to index mapping
var ReactionToIndex = map[string]int{
	"💩": TRASH,
	"🔥": FIRE,
	"🤡": CLOWN,
	"💀": DEAD,
	"😂": LMAO,
}

// Updated struct
type ResumeAnalysisRecord struct {
	Id           uuid.UUID `json:"id"`
	Name         string    `json:"name"`
	AIRisk       int       `json:"ai_risk"`
	Roast        string    `json:"roast"`
	AnalysisDate time.Time `json:"analysis_date"`
	ViewCount    int64     `json:"view_count"`
	Reactions    [5]int8   `json:"reactions"` // [trash, fire, clown, dead, lmao]
}

// Convert reactions array to map for frontend compatibility
func (r *ResumeAnalysisRecord) ReactionsMap() map[string]int {
	return map[string]int{
		"💩": int(r.Reactions[TRASH]),
		"🔥": int(r.Reactions[FIRE]),
		"🤡": int(r.Reactions[CLOWN]),
		"💀": int(r.Reactions[DEAD]),
		"😂": int(r.Reactions[LMAO]),
	}
}
