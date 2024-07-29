package api

import (
	"net/http"

	"github.com/gorilla/mux"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	router := mux.NewRouter()
	
	RegisterUserRoutes(router)
	// Setup other routes here...
	// fmt.Fprintf(w, "Hello from the main handler!")
	router.ServeHTTP(w, r)
}