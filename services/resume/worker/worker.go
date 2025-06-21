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

func ResumeAnalyser(ctx context.Context, input inngestgo.Input[json.RawMessage]) (any, error) {
	log.Printf("Received event: %+v", input.Event)

	var eventData ResumeAnalyserEventData
	if err := json.Unmarshal(input.Event, &eventData); err != nil {
		log.Printf("Failed to unmarshal event data: %v", err)
		return nil, fmt.Errorf("failed to unmarshal event data: %v %s, %s, event:  %+v, input: %+v", err, eventData.Text, eventData.JobID, input.Event, input)
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

		// Validate input
		if eventData.Text == "" {
			// fmt.Printf("Text is %s",  )
			err := fmt.Errorf("empty resume text provided %s, %s, event:  %+v, input: %+v", eventData.Text, eventData.JobID, input.Event, input)
			jobManager.FailJob(ctx, eventData.JobID, err)
			return nil, err
		}

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
