// /api/user.go
package api

import (
	"backend/handlers"   // Importing the handlers package
	"backend/middleware" // Importing the middleware package
	"fmt"
	"net/http"

	"github.com/gorilla/mux" // Importing the mux package from Gorilla for HTTP routing
)

// RegisterUserRoutes registers all the routes related to user operations

func RegisterUserRoutes(router *mux.Router) {
	router.HandleFunc("/api/signup", handlers.SignUpHandler).Methods("POST") // Route for user signup
	router.HandleFunc("/api/signin", handlers.SignInHandler).Methods("POST") // Route for user signin
	router.HandleFunc("/api/skills", handlers.GetSkillsHandler).Methods("GET")

	// Routes that require authentication
	authenticated := router.PathPrefix("/api").Subrouter()
	authenticated.Use(middleware.JwtVerify)

	// Add User
	authenticated.HandleFunc("/user", handlers.AddUserHandler).Methods("POST")

	// Get User
	authenticated.HandleFunc("/user", handlers.GetUserHandler).Methods("GET")                               // Route for getting a user
	authenticated.HandleFunc("/user/{id}", handlers.GetUserByIDHandler).Methods("GET")                      // Route for getting a user by ID
	authenticated.HandleFunc("/user/email/{email}", handlers.GetUserByEmailHandler).Methods("GET")          // Route for getting a user by email
	authenticated.HandleFunc("/user/username/{username}", handlers.GetUserByUsernameHandler).Methods("GET") // Route for getting a user by username

	// Update User
	authenticated.HandleFunc("/user/{id}", handlers.UpdateUserHandler).Methods("PATCH")                          // Route for updating a user by ID
	authenticated.HandleFunc("/user/email/{email}", handlers.UpdateUserByEmailHandler).Methods("PATCH")          // Route for updating a user by email
	authenticated.HandleFunc("/user/username/{username}", handlers.UpdateUserByUsernameHandler).Methods("PATCH") // Route for updating a user by username
	authenticated.HandleFunc("/user", handlers.AddUserHandler).Methods("POST")                                   // Route for adding a new user

	// Get User Skills
	authenticated.HandleFunc("/user/id/{id}/skills", handlers.GetSkillsByUserIDHandler).Methods("GET")               // Route for getting skills by id
	authenticated.HandleFunc("/user/username/{username}/skills", handlers.GetSkillsByUsernameHandler).Methods("GET") // Route for getting skills by username
	authenticated.HandleFunc("/user/email/{email}/skills", handlers.GetSkillsByEmailHandler).Methods("GET")          // Route for getting skills by email

	// AI Routes
	authenticated.HandleFunc("/cover-letter", handlers.GeminiCoverLetterHandler).Methods("POST")  // Route for generating a cover letter using Gemini
	authenticated.HandleFunc("/calc-chance", handlers.CalculateReplacementChance).Methods("POST") // Route for calculating replacement chance
	authenticated.HandleFunc("/resume-review", handlers.ResumeReview).Methods("POST")             // Route for reviewing a resume

	// Resume CRUD

	authenticated.HandleFunc("/user/{userID}/resumes", handlers.AddResumeHandler).Methods("POST")
	authenticated.HandleFunc("/user/{userID}/resumes/{resumeID}", handlers.UpdateResumeHandler).Methods("PUT")
	authenticated.HandleFunc("/user/{userID}/resumes/{resumeID}", handlers.DeleteResumeHandler).Methods("DELETE")

	// This is Cover letter handler using Open AI (to be used only when OPENAI key is present)
	// authenticated.HandleFunc("/cover-letter", handlers.OpenAICoverLetterHandler).Methods("POST")
}

func RouteHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "This is a dummy handler for route.go")
}

