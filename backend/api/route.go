// /api/user.go
package api

import (
	"backend/handlers"

	"github.com/gorilla/mux"
)

func RegisterUserRoutes(mux *mux.Router) {
	mux.HandleFunc("/api/signup", handlers.SignUpHandler)
	mux.HandleFunc("/api/signin", handlers.SignInHandler)
	mux.HandleFunc("/api/user", handlers.GetUserHandler).Methods("GET")
	mux.HandleFunc("/api/user/{id}", handlers.UpdateUserHandler).Methods("PATCH")
	mux.HandleFunc("/api/user", handlers.AddUserHandler).Methods("POST")
	mux.HandleFunc("/api/skills", handlers.GetSkillsHandler)
	mux.HandleFunc("/api/cover-letter", handlers.GeminiCoverLetterHandler)
	mux.HandleFunc("/api/calc-chance", handlers.CalculateReplacementChance)
	mux.HandleFunc("/api/resume-review", handlers.ResumeReview)

	// This is Cover letter handler using Open AI (to be used only when OPENAI key is present)
	// mux.HandleFunc("/api/cover-letter", handlers.OpenAICoverLetterHandler)
}
