package api

import (
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)


func Handler(w http.ResponseWriter, r *http.Request) {
	router := mux.NewRouter()
	RegisterUserRoutes(router)

	// Setup CORS
	corsMiddleware := handlers.CORS(
		handlers.AllowedOrigins([]string{"https://profilefolio-theta.vercel.app"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)

	// Wrap the router with the CORS middleware
	corsHandler := corsMiddleware(router)
	corsHandler.ServeHTTP(w, r)
}