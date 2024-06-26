// /handlers/userHandler.go
package handlers

import (
	"backend/models"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var client *mongo.Client

func SetClient(mongoClient *mongo.Client) {
    client = mongoClient
}
func GetUserHandler(w http.ResponseWriter, r *http.Request) {
    collection := client.Database("profileFolio").Collection("users")
    var user models.User

    // Define your filter (optional, for clarity)
    filter := bson.M{} // Empty filter to retrieve any document

    // Log before executing the FindOne operation
    log.Printf("Attempting to find a document in collection 'users' with filter: %+v", filter)

    // Execute the FindOne operation
    err := collection.FindOne(context.Background(), filter).Decode(&user)
    if err != nil {
        log.Printf("Error finding document in collection 'users': %v", err)
        http.Error(w, fmt.Sprintf("Error finding document in collection 'users': %v", err), http.StatusInternalServerError)
        return
    }

    // If no error, log success and proceed
    log.Println("Successfully retrieved user document:", user)

    json.NewEncoder(w).Encode(user)
}