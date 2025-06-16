package pkg

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DatabaseURL string
	AIAPIKey    string
	Port        string
	Environment string
}

func Load() (*Config, error) {
	// Only load .env in non-production environments
	if os.Getenv("VERCEL") == "" {
		_ = godotenv.Load()
	}

	cfg := &Config{
		DatabaseURL: getEnvWithDefault("DATABASE_URL", "host=localhost port=5432 user=postgres password=postgres dbname=resume_roaster sslmode=disable"),
		AIAPIKey:    os.Getenv("AI_API_KEY"),
		Port:        getEnvWithDefault("PORT", "8080"),
		Environment: getEnvWithDefault("ENVIRONMENT", "development"),
	}

	return cfg, nil
}

func getEnvWithDefault(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
