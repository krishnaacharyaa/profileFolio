// File: api/index.go
package api

import (
	"fmt"
	"net/http"
	"strings"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/")
	
	switch path {
	case "hello":
		fmt.Fprintf(w, "Hello from Go on Vercel!")
	case "hey":
		fmt.Fprintf(w, "Hey there! This is Go running on Vercel!")
	default:
		http.Error(w, "Not Found", http.StatusNotFound)
	}
}