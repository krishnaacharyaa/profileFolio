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
	"log"
	"net/http"
	"profilefolio/api/handlers"
	"profilefolio/api/routes"
	"profilefolio/models/analysis"
	"profilefolio/pkg"
	services "profilefolio/services"
	"profilefolio/utils"
	"profilefolio/worker"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/inngest/inngestgo"
)

func Handler(w http.ResponseWriter, r *http.Request) {

	fmt.Printf("Incoming request - Method: %s, Path: %s, Query: %v\n",
		r.Method, r.URL.Path, r.URL.Query())

	// Initialize Gin in serverless mode
	gin.SetMode(gin.ReleaseMode)
	router := gin.New()
	router.Use(cors.Default())
	db := pkg.NewDatabase()
	defer db.Close()

	redisCache, err := pkg.NewRedisCacheFromEnv()
	if err != nil {
		log.Fatal("Failed to initialize Redis:", err)
	}
	aiClient := pkg.NewAIClient()
	defer aiClient.(*pkg.GeminiAIClient).Close()

	roasterRepo := analysis.NewAnalysisRepository(db)

	inngestClient, err := inngestgo.NewClient(inngestgo.ClientOpts{
		AppID: "profilefolio-backend",
	})
	if err != nil {
		fmt.Printf("Failed to initialize Inngest client: %v\n", err)
		return
	}

	// Define and register a durable function
	_, err = inngestgo.CreateFunction(
		inngestClient,
		inngestgo.FunctionOpts{
			ID: "resume-analyser",
		},
		inngestgo.EventTrigger("api/resume-analyser", nil),
		worker.ResumeAnalyser,
	)
	if err != nil {
		fmt.Printf("Failed to create function: %v\n", err)
		return
	}
	router.Any("/api/inngest", gin.WrapH(inngestClient.Serve()))
	roasterService := services.NewResumeRoaster(aiClient, roasterRepo)
	roasterHandler := handlers.NewResumeRoasterHandler(roasterService, redisCache, &inngestClient)
	// Apply middleware
	router.Use(utils.ServerlessLogger(), gin.Recovery())

	apiGroup := router.Group("/")
	// Register routes
	routes.RegisterAnalysisRoutes(apiGroup, roasterHandler)

	// Serve the request
	router.ServeHTTP(w, r)
}
