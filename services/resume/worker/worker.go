package worker

import (
	"context"
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

func ResumeAnalyser(ctx context.Context, input inngestgo.Input[ResumeAnalyserEventData]) (any, error) {
	log.Printf("Received event: %+v", input.Event)

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
		if input.Event.Text == "" {
			// fmt.Printf("Text is %s",  )
			err := fmt.Errorf("empty resume text provided %s, %s, %+v", input.Event.Text, input.Event.JobID, input.Event)
			jobManager.FailJob(ctx, input.Event.JobID, err)
			return nil, err
		}

		result, err := roasterService.RoastResume(ctx, input.Event.Text)
		if err != nil {
			log.Printf("AI analysis failed for jobID %s: %v", input.Event.JobID, err)
			jobManager.FailJob(ctx, input.Event.JobID, fmt.Errorf("AI analysis failed: %v", err))
			return nil, err
		}

		err = jobManager.CompleteJob(ctx, input.Event.JobID, result)
		if err != nil {
			log.Printf("Failed to complete job %s: %v", input.Event.JobID, err)
			return nil, fmt.Errorf("failed to complete job: %v", err)
		}

		log.Printf("Successfully analyzed resume for jobID: %s", input.Event.JobID)
		return true, nil
	})
	if err != nil {
		log.Printf("Step failed for jobID %s: %v", input.Event.JobID, err)
		return nil, fmt.Errorf("failed to analyze resume: %v", err)
	}

	return map[string]string{"status": "success"}, nil
}
