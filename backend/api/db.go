package api

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	client *mongo.Client
	once   sync.Once
)

func init() {
	initDB()
}

func initDB() {
	once.Do(func() {
		mongoURI := os.Getenv("MONGODB_URI")
		if mongoURI == "" {
			log.Println("MONGODB_URI environment variable is not set")
			return
		}

		clientOptions := options.Client().ApplyURI(mongoURI)
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var err error
		client, err = mongo.Connect(ctx, clientOptions)
		if err != nil {
			log.Printf("Error connecting to MongoDB: %v", err)
			return
		}

		err = client.Ping(ctx, nil)
		if err != nil {
			log.Printf("Error pinging MongoDB: %v", err)
			return
		}

		log.Println("Connected to MongoDB successfully")
	})
}

func GetClient() *mongo.Client {
	return client
}

// Handler is a dummy handler to satisfy Vercel's requirements
func Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "This is a dummy handler for db.go")
}