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

type AccountCreatedEventData struct {
	Text  string `json:"text"`
	JobId string `json:"jobId"`
}

func ResumeAnalyser(ctx context.Context, input inngestgo.Input[AccountCreatedEventData]) (any, error) {
	fmt.Printf("Received event: %+v\n", input)

	_, err := step.Run(ctx, "analyse-resume", func(ctx context.Context) (any, error) {
		db := pkg.NewDatabase()
		defer db.Close()

		redisCache, err := pkg.NewRedisCacheFromEnv()
		if err != nil {
			log.Fatal("Failed to initialize Redis:", err)
		}
		aiClient := pkg.NewAIClient()
		defer aiClient.(*pkg.GeminiAIClient).Close()

		roasterRepo := analysis.NewAnalysisRepository(db)

		roasterService := services.NewResumeRoaster(aiClient, roasterRepo)
		jobManager := pkg.NewJobManager(redisCache)
		result, err := roasterService.RoastResume(ctx, input.Event.Text)
		if err != nil {
			jobManager.FailJob(ctx, input.Event.JobId, fmt.Errorf("AI analysis failed: %v", err))
			return nil, err
		}

		jobManager.CompleteJob(ctx, input.Event.JobId, result)
		return true, nil
	})
	if err != nil {
		return nil, fmt.Errorf("failed to send follow-up email: %v", err)
	}

	return nil, nil
}
