package pkg

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/google/generative-ai-go/genai"
	"github.com/joho/godotenv"
	"google.golang.org/api/option"
)

type AIClient interface {
	GenerateContent(ctx context.Context, modelName string, prompt string) (string, error)
}

type GeminiAIClient struct {
	client *genai.Client
}

func NewAIClient() AIClient {
	_ = godotenv.Load()
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
	if g.client == nil {
		return "", fmt.Errorf("AI client is not initialized")
	}

	if modelName == "" {
		return "", fmt.Errorf("model name cannot be empty")
	}

	if prompt == "" {
		return "", fmt.Errorf("prompt cannot be empty")
	}

	model := g.client.GenerativeModel(modelName)
	if model == nil {
		return "", fmt.Errorf("model is nil")
	}

	fmt.Printf("Generating content with prompt %s", genai.Text(prompt))
	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return "", fmt.Errorf("failed to generate content: %w", err)
	}
	fmt.Printf("Generated content")
	if len(resp.Candidates) == 0 {
		return "", fmt.Errorf("no candidates in response")
	}

	if len(resp.Candidates[0].Content.Parts) == 0 {
		return "", fmt.Errorf("no content parts in response")
	}

	part := resp.Candidates[0].Content.Parts[0]
	return fmt.Sprintf("%v", part), nil
}

func (g *GeminiAIClient) Close() error {
	return g.client.Close()
}
