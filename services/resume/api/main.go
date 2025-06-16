// api/hello.go
package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Response struct {
	Message string `json:"message"`
	Status  string `json:"status"`
}

// Handler is the main function for the serverless endpoint
func Handler(w http.ResponseWriter, r *http.Request) {
	// Set CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	// Handle preflight requests
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	switch r.Method {
	case "GET":
		handleGet(w, r)
	case "POST":
		handlePost(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func handleGet(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	if name == "" {
		name = "World"
	}

	response := Response{
		Message: fmt.Sprintf("Hello, %s!", name),
		Status:  "success",
	}

	json.NewEncoder(w).Encode(response)
}

func handlePost(w http.ResponseWriter, r *http.Request) {
	var body map[string]interface{}

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	response := Response{
		Message: fmt.Sprintf("Received: %v", body),
		Status:  "success",
	}

	json.NewEncoder(w).Encode(response)
}
