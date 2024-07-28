package api

import (
	"encoding/json"
	"net/http"
)

type CoverLetterResponse struct {
	Message string `json:"message"`
}

func GetCoverLetterHandler(w http.ResponseWriter, r *http.Request) {
	response := CoverLetterResponse{
		Message: "This is a dummy cover letter response. Replace with actual implementation.",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}