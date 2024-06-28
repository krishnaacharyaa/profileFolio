package handlers

import (
	"backend/config"
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	openai "github.com/sashabaranov/go-openai"
)

func ChatHandler(w http.ResponseWriter, r *http.Request) {
	aiKey := config.GetOpenAIAPIKey()
	client := openai.NewClient(aiKey)
	var userInput struct {
		Message string `json:"message"`
		Profile string `json:"profile"`
	}
	if err := json.NewDecoder(r.Body).Decode(&userInput); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: userInput.Message,
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: userInput.Profile,
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "write a cover letter based on this Job Description, you are truthful and doesn't lie about your skills. The user's information is given.",
				},
			},
		},
	)
	if err != nil {
		http.Error(w, fmt.Sprintf("ChatCompletion error: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp.Choices[0].Message.Content)
}

func CalculateReplacementChance(w http.ResponseWriter, r *http.Request) {
	aiKey := config.GetOpenAIAPIKey()
	client := openai.NewClient(aiKey)
	var userInput struct {
		Profile  string `json:"profile"`
		Position string `json:"position"`
	}
	if err := json.NewDecoder(r.Body).Decode(&userInput); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model:     openai.GPT3Dot5Turbo,
			MaxTokens: 20,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: userInput.Profile,
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: userInput.Position,
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: fmt.Sprintf("based on my userinfo, just give me percent likely chance that ai can replace me. output format: The chance that AI can replace you as %s is [percentage chance] % :"),
				},
			},
		},
	)
	if err != nil {
		http.Error(w, fmt.Sprintf("ChatCompletion error: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp.Choices[0].Message.Content)
}
