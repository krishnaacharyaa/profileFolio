package api

import (
	h "backend/handlers"
	"context"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func initMongoClient() {
	mongoURI := os.Getenv("MONGODB_URI")
	print(mongoURI)
	if mongoURI == "" {
		log.Println("MONGODB_URI environment variable is not set")
		return
	}

	clientOptions := options.Client().ApplyURI(mongoURI)
	var err error
	client, err = mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatalf("Error connecting to MongoDB: %v", err)
	}

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatalf("Error pinging MongoDB: %v", err)
	}
	h.SetClient(client)
	log.Println("Connected to MongoDB successfully")
}
func Handler(w http.ResponseWriter, r *http.Request) {
	// Initialize MongoDB client if not already initialized
	if client == nil {
		initMongoClient()
	}
	router := mux.NewRouter()
	RegisterUserRoutes(router)

	// Setup CORS
	corsMiddleware := handlers.CORS(
		handlers.AllowedOrigins([]string{"https://profilefolio-theta.vercel.app"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)

	// Wrap the router with the CORS middleware
	corsHandler := corsMiddleware(router)
	corsHandler.ServeHTTP(w, r)
}