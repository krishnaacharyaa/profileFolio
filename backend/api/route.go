// /api/user.go
package api

import (
	"backend/handlers"
	"backend/middleware"

	"github.com/gorilla/mux"
)

func RegisterUserRoutes(router *mux.Router) {
	router.HandleFunc("/api/signup", handlers.SignUpHandler).Methods("POST")
	router.HandleFunc("/api/signin", handlers.SignInHandler).Methods("POST")

	// Routes that require authentication
	authenticated := router.PathPrefix("/api").Subrouter()
	authenticated.Use(middleware.JwtVerify)

	authenticated.HandleFunc("/user", handlers.GetUserHandler).Methods("GET")
	authenticated.HandleFunc("/user/{id}", handlers.UpdateUserHandler).Methods("PATCH")
	authenticated.HandleFunc("/user", handlers.AddUserHandler).Methods("POST")
	authenticated.HandleFunc("/skills", handlers.GetSkillsHandler).Methods("GET")
	authenticated.HandleFunc("/cover-letter", handlers.GeminiCoverLetterHandler).Methods("POST")
	authenticated.HandleFunc("/calc-chance", handlers.CalculateReplacementChance).Methods("POST")
	authenticated.HandleFunc("/resume-review", handlers.ResumeReview).Methods("POST")

	// This is Cover letter handler using Open AI (to be used only when OPENAI key is present)
	// authenticated.HandleFunc("/cover-letter", handlers.OpenAICoverLetterHandler).Methods("POST")
}
