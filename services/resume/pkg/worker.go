package pkg

import (
	"context"
	"fmt"
	"time"

	"github.com/inngest/inngestgo"
	"github.com/inngest/inngestgo/step"
)

type AccountCreatedEventData struct {
	UserID string `json:"userId"`
}

func AccountCreated(ctx context.Context, input inngestgo.Input[AccountCreatedEventData]) (any, error) {
	fmt.Printf("Received event: %v\n", input.Event.UserID)

	// Define a step (e.g., send a follow-up email)
	_, err := step.Run(ctx, "send-follow-up-email", func(ctx context.Context) (any, error) {
		fmt.Printf("Sending follow-up email for account: %s\n", input.Event.UserID)
		time.Sleep(1 * time.Second) // Simulate work
		return true, nil
	})
	if err != nil {
		return nil, fmt.Errorf("failed to send follow-up email: %v", err)
	}

	return nil, nil
}
