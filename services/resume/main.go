package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"profilefolio/api/handlers"
	"profilefolio/api/routes"
	"profilefolio/models/analysis"
	"profilefolio/pkg"
	"profilefolio/services"
	"profilefolio/utils"
	"profilefolio/worker"
	"time"

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
			ID: "resume-analysis-job",
		},
		inngestgo.EventTrigger("api/resume-analyser", nil),
		func(ctx context.Context, input inngestgo.Input[json.RawMessage]) (any, error) {
			return worker.ResumeAnalyser(ctx, input)
		},
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

	// Initialize the database schema
	if err := InitializeDatabase(db); err != nil {
		log.Fatal("Failed to initialize database:", err)
	}

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

func InitializeDatabase(db pkg.Database) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Drop existing table if it exists
	_, err := db.ExecContext(ctx, `DROP TABLE IF EXISTS resume_analyses`)
	if err != nil {
		return fmt.Errorf("failed to drop table: %w", err)
	}

	// Create new table with UUID
	_, err = db.ExecContext(ctx, `
		CREATE TABLE resume_analyses (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			name TEXT NOT NULL,
			ai_risk TEXT NOT NULL,
			roast TEXT NOT NULL,
			analysis_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
			view_count INTEGER DEFAULT 1,
			reactions JSONB
		)
	`)
	if err != nil {
		return fmt.Errorf("failed to create table: %w", err)
	}

	log.Println("Database initialized with new schema")
	return nil
}
