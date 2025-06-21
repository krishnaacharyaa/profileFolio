package main

import (
	"fmt"
	"log"
	"profilefolio/api/handlers"
	"profilefolio/api/routes"
	"profilefolio/models/analysis"
	"profilefolio/pkg"
	"profilefolio/services"
	"profilefolio/utils"
	"profilefolio/worker"

	"github.com/gin-gonic/gin"

	_ "github.com/lib/pq" // Postgres driver

	"github.com/inngest/inngestgo"
)

func main() {
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

	redisCache, err := pkg.NewRedisCacheFromEnv()
	if err != nil {
		log.Fatal("Failed to initialize Redis:", err)
	}
	defer redisCache.Close()
	db := pkg.NewDatabase()
	defer db.Close()

	aiClient := pkg.NewAIClient()
	defer aiClient.(*pkg.GeminiAIClient).Close()

	roasterRepo := analysis.NewAnalysisRepository(db)

	roasterService := services.NewResumeRoaster(aiClient, roasterRepo)
	roasterHandler := handlers.NewResumeRoasterHandler(roasterService, redisCache, &inngestClient)

	// Create Gin router
	router := gin.Default()

	// Register Inngest endpoint before middleware
	router.Any("/api/inngest", gin.WrapH(inngestClient.Serve()))

	// Apply middleware
	router.Use(utils.CORSMiddleware())
	router.Use(utils.LoggerMiddleware())

	// Register other routes (simplified for brevity)
	apiGroup := router.Group("/")
	routes.RegisterAnalysisRoutes(apiGroup, roasterHandler)

	// Start server
	log.Println("🔥 Server starting on :8080")
	if err := router.Run(":8080"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
