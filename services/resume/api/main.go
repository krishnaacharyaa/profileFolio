package main

import (
	"encoding/json"
	"net/http"
	"os"
)

type Message struct {
	Text string `json:"text"`
}

func handler(w http.ResponseWriter, r *http.Request) {
	msg := Message{
		Text: "Hello from Go on Vercel!",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(msg)
}

func getEnvVars(w http.ResponseWriter, r *http.Request) {
	apiKey := os.Getenv("AI_API_KEY")
	dbUrl := os.Getenv("DATABASE_URL")

	response := map[string]string{
		"AI_API_KEY":   apiKey,
		"DATABASE_URL": dbUrl,
		"status":       "success",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("/", handler)
	http.HandleFunc("/env", getEnvVars)
	http.HandleFunc("/api", handler)
	http.HandleFunc("/api/test", getEnvVars)
}
