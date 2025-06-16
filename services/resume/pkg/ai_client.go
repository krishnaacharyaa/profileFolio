package pkg

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

type AIClient interface {
	GenerateContent(ctx context.Context, modelName string, prompt string) (string, error)
}

type GeminiAIClient struct {
	client *genai.Client
}

func NewAIClient() AIClient {
	apiKey := os.Getenv("AI_API_KEY")
	if apiKey == "" {
		log.Fatal("AI_API_KEY environment variable is required")
	}

	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		log.Fatal("Failed to create AI client:", err)
	}

	return &GeminiAIClient{client: client}
}

func (g *GeminiAIClient) GenerateContent(ctx context.Context, modelName string, prompt string) (string, error) {
	model := g.client.GenerativeModel(modelName)
	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return "", fmt.Errorf("failed to generate content: %w", err)
	}

	if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
		return "", fmt.Errorf("no response from AI model")
	}

	return fmt.Sprintf("%v", resp.Candidates[0].Content.Parts[0]), nil
}

func (g *GeminiAIClient) Close() error {
	return g.client.Close()
}
