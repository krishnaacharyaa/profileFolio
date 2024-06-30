// /api/user.go
package api

import (
	"backend/handlers"
	"net/http"
)

func RegisterUserRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/user", handlers.GetUserHandler)
	mux.HandleFunc("/api/skills", handlers.GetSkillsHandler)
	mux.HandleFunc("/api/cover-letter", handlers.ChatHandler)
	mux.HandleFunc("/api/calc-chance", handlers.CalculateReplacementChance)
	mux.HandleFunc("/api/resume-review", handlers.ResumeReview)
}
