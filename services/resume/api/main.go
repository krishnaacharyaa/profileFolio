// api/resumes.go
package handler

import (
	"encoding/json"
	"net/http"
	"os"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		handleGetResumes(w, r)
	case "POST":
		handlePostResume(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func handleGetResumes(w http.ResponseWriter, r *http.Request) {
	// Your GET logic here
	json.NewEncoder(w).Encode(map[string]string{
		"message": "GET resumes endpoint",
		"db_url":  os.Getenv("DATABASE_URL"),
	})
}

func handlePostResume(w http.ResponseWriter, r *http.Request) {
	// Your POST logic here
	json.NewEncoder(w).Encode(map[string]string{
		"message": "POST resume endpoint",
		"api_key": os.Getenv("AI_API_KEY"),
	})
}
