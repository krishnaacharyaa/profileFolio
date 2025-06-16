// package api

// import (
// 	"fmt"
// 	"net/http"
// )

// func Handler(w http.ResponseWriter, r *http.Request) {
// 	// Set CORS headers
// 	w.Header().Set("Access-Control-Allow-Origin", "*")
// 	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
// 	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

// 	// Handle preflight requests
// 	if r.Method == "OPTIONS" {
// 		w.WriteHeader(http.StatusOK)
// 		return
// 	}

// 	// Simple hello response
// 	w.Header().Set("Content-Type", "text/plain")
// 	w.WriteHeader(http.StatusOK)
// 	fmt.Fprintf(w, "Hello from Go API!")
// }

package api

import (
	"fmt"
	"net/http"
	"profilefolio/api/handlers"
	"profilefolio/api/routes"
	"profilefolio/models/analysis"
	"profilefolio/pkg"
	services "profilefolio/services"
	"profilefolio/utils"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Handler(w http.ResponseWriter, r *http.Request) {

	fmt.Printf("Incoming request - Method: %s, Path: %s, Query: %v\n",
		r.Method, r.URL.Path, r.URL.Query())

	switch r.URL.Path {
	case "/api/test":
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok"}`))
		return
	case "/":
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok /"}`))
	case "/api":
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok /api"}`))
	default:
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte(`{"error":"not found"}`))
	}

	if r.URL.Path == "/api/test" && r.Method == "GET" {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Test endpoint working"))
		return
	}

	// Initialize Gin in serverless mode
	gin.SetMode(gin.ReleaseMode)
	router := gin.New()
	router.Use(cors.Default())
	db := pkg.NewDatabase()
	defer db.Close()

	aiClient := pkg.NewAIClient()
	defer aiClient.(*pkg.GeminiAIClient).Close()

	roasterRepo := analysis.NewAnalysisRepository(db)

	roasterService := services.NewResumeRoaster(aiClient, roasterRepo)
	roasterHandler := handlers.NewResumeRoasterHandler(roasterService)
	// Apply middleware
	router.Use(utils.ServerlessLogger(), gin.Recovery())

	apiGroup := router.Group("/")
	// Register routes
	routes.RegisterAnalysisRoutes(apiGroup, roasterHandler)

	// Serve the request
	router.ServeHTTP(w, r)
}
