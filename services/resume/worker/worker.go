package worker

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"profilefolio/models/analysis"
	"profilefolio/pkg"
	"profilefolio/services"

	"github.com/inngest/inngestgo"
	"github.com/inngest/inngestgo/step"
)

type ResumeAnalyserEventData struct {
	Text  string `json:"text"`
	JobID string `json:"jobId"`
}

// EventWrapper matches the outer structure of the Inngest event
type EventWrapper struct {
	Data ResumeAnalyserEventData `json:"data"`
	ID   string                  `json:"id"`
	Name string                  `json:"name"`
	TS   int64                   `json:"ts"`
	User map[string]interface{}  `json:"user"`
}

func ResumeAnalyser(ctx context.Context, input inngestgo.Input[json.RawMessage]) (any, error) {
	log.Printf("Raw input: %s", string(input.Event))

	// Unmarshal the raw JSON into EventWrapper
	var wrapper EventWrapper
	if err := json.Unmarshal(input.Event, &wrapper); err != nil {
		log.Printf("Failed to unmarshal event wrapper: %v", err)
		return nil, fmt.Errorf("failed to unmarshal event wrapper %v , %+v", err, input.Event)
	}

	// Extract the nested data field
	eventData := wrapper.Data
	log.Printf("Parsed event data: %+v", eventData)

	// Validate input
	if eventData.Text == "" {
		err := fmt.Errorf("empty resume text provided: %+v", eventData)
		log.Printf("Validation error: %v", err)
		return nil, err
	}

	_, err := step.Run(ctx, "analyse-resume", func(ctx context.Context) (any, error) {
		db := pkg.NewDatabase()
		defer db.Close()

		redisCache, err := pkg.NewRedisCacheFromEnv()
		if err != nil {
			log.Printf("Failed to initialize Redis: %v", err)
			return nil, fmt.Errorf("failed to initialize Redis: %v", err)
		}

		aiClient := pkg.NewAIClient()
		defer aiClient.(*pkg.GeminiAIClient).Close()

		roasterRepo := analysis.NewAnalysisRepository(db)
		roasterService := services.NewResumeRoaster(aiClient, roasterRepo)
		jobManager := pkg.NewJobManager(redisCache)

		result, err := roasterService.RoastResume(ctx, eventData.Text)
		if err != nil {
			log.Printf("AI analysis failed for jobID %s: %v", eventData.JobID, err)
			jobManager.FailJob(ctx, eventData.JobID, fmt.Errorf("AI analysis failed: %v", err))
			return nil, err
		}

		err = jobManager.CompleteJob(ctx, eventData.JobID, result)
		if err != nil {
			log.Printf("Failed to complete job %s: %v", eventData.JobID, err)
			return nil, fmt.Errorf("failed to complete job: %v", err)
		}

		log.Printf("Successfully analyzed resume for jobID: %s", eventData.JobID)
		return true, nil
	})
	if err != nil {
		log.Printf("Step failed for jobID %s: %v", eventData.JobID, err)
		return nil, fmt.Errorf("failed to analyze resume: %v", err)
	}

	return map[string]string{"status": "success"}, nil
}
