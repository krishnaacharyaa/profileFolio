package handlers

import (
	"backend/config"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/google/generative-ai-go/genai"
	openai "github.com/sashabaranov/go-openai"
	"google.golang.org/api/option"
)

func GeminiCoverLetterHandler(w http.ResponseWriter, r *http.Request) {
	var userInput struct {
		Message string          `json:"message"`
		Profile json.RawMessage `json:"profile"`
	}
	if err := json.NewDecoder(r.Body).Decode(&userInput); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	var profile map[string]interface{}
	if err := json.Unmarshal(userInput.Profile, &profile); err != nil {
		http.Error(w, "Invalid profile format", http.StatusBadRequest)
		return
	}

	ctx := context.Background()

	client, err := genai.NewClient(ctx, option.WithAPIKey(os.Getenv("GEMINI_API_KEY")))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Close()
	context := "write a cover letter based on this Job Description, you are truthful and doesn't lie about your skills. The user's information is given, autofill prefill all the details from Profile Information in the letter, no  []."
	model := client.GenerativeModel("gemini-1.0-pro")
	prompt := []genai.Part{
		genai.Text(userInput.Message),
		genai.Text(fmt.Sprintf("Profile %s", userInput.Profile)),
		genai.Text(context),
	}
	resp, err := model.GenerateContent(ctx, prompt...)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Generated text content:")
	fmt.Println(resp.Candidates[0].Content.Parts[0])

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp.Candidates[0].Content.Parts[0])
}

func OpenAICoverLetterHandler(w http.ResponseWriter, r *http.Request) {
	aiKey := config.GetOpenAIAPIKey()
	client := openai.NewClient(aiKey)
	var userInput struct {
		Message string          `json:"message"`
		Profile json.RawMessage `json:"profile"`
	}
	if err := json.NewDecoder(r.Body).Decode(&userInput); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	profileStr := string(userInput.Profile)

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
					Content: profileStr,
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "write a cover letter based on this Job Description, you are truthful and doesn't lie about your skills. The user's information is given, prefill all the details.",
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
		Profile  json.RawMessage `json:"profile"`
		Position string          `json:"position"`
	}

	profileStr := string(userInput.Profile)
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
					Content: profileStr,
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: userInput.Position,
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "based on my userinfo, just give me percent likely chance that ai can replace me. output format: The chance that AI can replace you as %s is [percentage chance] % :",
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

func ResumeReview(w http.ResponseWriter, r *http.Request) {
	aiKey := config.GetOpenAIAPIKey()
	client := openai.NewClient(aiKey)
	var userInput struct {
		Resume string `json:"resume"`
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
					Content: userInput.Resume,
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "Review this resume throughly and give me detailed strenghts and weaknesses, What is the predicted sallary for me.",
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
