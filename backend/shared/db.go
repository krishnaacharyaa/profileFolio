package shared

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	client *mongo.Client
	once   sync.Once
)

func GetClient() *mongo.Client {
	once.Do(func() {
		mongoURI := os.Getenv("MONGODB_URI")
		if mongoURI == "" {
			log.Println("MONGODB_URI environment variable is not set")
			return
		}

		clientOptions := options.Client().ApplyURI(mongoURI)
		var err error
		client, err = mongo.Connect(context.Background(), clientOptions)
		if err != nil {
			log.Printf("Error connecting to MongoDB: %v", err)
			return
		}

		err = client.Ping(context.Background(), nil)
		if err != nil {
			log.Printf("Error pinging MongoDB: %v", err)
			return
		}

		log.Println("Connected to MongoDB successfully")
	})

	return client
}
func MongoDBHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "This is a dummy handler for db.go")
}