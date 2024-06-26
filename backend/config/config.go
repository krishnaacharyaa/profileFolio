// config/config.go
package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
    if err := godotenv.Load(); err != nil {
        log.Print("No .env file found")
    }
}

func GetMongoURI() string {
    uri, exists := os.LookupEnv("MONGO_URL")
    if !exists {
        log.Fatal("MONGO_URL not set in environment")
    }
    return uri
}
