// /api/user.go
package api

import (
	"backend/handlers"
	"net/http"
)

func RegisterUserRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/api/signup", handlers.SignUpHandler)
	mux.HandleFunc("/api/signin", handlers.SignInHandler)
    mux.HandleFunc("/api/user", handlers.GetUserHandler)
	mux.HandleFunc("/api/skills", handlers.GetSkillsHandler)
}
