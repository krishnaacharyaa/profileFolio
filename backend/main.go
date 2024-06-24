package main

import (
	"encoding/json"
	"net/http"

	"github.com/rs/cors"
)

type Response struct {
    Message string `json:"message"`
}

func handler(w http.ResponseWriter, r *http.Request) {
    response := Response{Message: "Hello, World!"}
    json.NewEncoder(w).Encode(response)
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/api/hello", handler)

    // Use the cors package to allow cross-origin requests
    handler := cors.Default().Handler(mux)

    http.ListenAndServe(":8080", handler)
}
