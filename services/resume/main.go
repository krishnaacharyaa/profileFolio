package main

import (
	"log"
	"profilefolio/api/handlers"
	"profilefolio/api/routes"
	"profilefolio/models/analysis"
	"profilefolio/pkg"
	services "profilefolio/services"
	"profilefolio/utils"

	"github.com/gin-gonic/gin"

	_ "github.com/lib/pq" // Postgres driver
)

func main() {
	db := pkg.NewDatabase()
	defer db.Close()

	aiClient := pkg.NewAIClient()
	defer aiClient.(*pkg.GeminiAIClient).Close()

	roasterRepo := analysis.NewAnalysisRepository(db)

	roasterService := services.NewResumeRoaster(aiClient, roasterRepo)
	roasterHandler := handlers.NewResumeRoasterHandler(roasterService)

	// Create Gin router
	router := gin.Default()

	// Apply middleware
	router.Use(utils.CORSMiddleware())
	router.Use(utils.LoggerMiddleware())

	// Register routes
	apiGroup := router.Group("/api")
	routes.RegisterAnalysisRoutes(apiGroup, roasterHandler)

	// Start server
	log.Println("🔥 Server starting on :8080")
	if err := router.Run(":8080"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
