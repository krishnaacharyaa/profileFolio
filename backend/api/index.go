package api

import (
	"net/http"
	"strings"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/")
	
	switch path {
	case "user":
		GetAllUsersHandler(w, r)
	// case "cover-letter":
	// 	GetCoverLetterHandler(w, r)
	default:
		http.Error(w, "Not Found", http.StatusNotFound)
	}
}