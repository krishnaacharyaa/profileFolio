// /handlers/userHandler.go
package handlers

import (
	"backend/models"
	"context"
	"encoding/json"
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
    err := collection.FindOne(context.Background(), bson.M{}).Decode(&user)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    log.Println("Successfully retrieved user document:", user)

    json.NewEncoder(w).Encode(user)
}
func GetSkillsHandler(w http.ResponseWriter, r *http.Request) {
	collection := client.Database("profileFolio").Collection("skills")
    var skills []models.SkillCollection

    cursor, err := collection.Find(context.Background(), bson.M{})
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer cursor.Close(context.Background())

    for cursor.Next(context.Background()) {
        var skill models.SkillCollection
        if err := cursor.Decode(&skill); err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        skills = append(skills, skill)
    }

    if err := cursor.Err(); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    log.Println("Successfully retrieved user document:", skills)

    w.Header().Set("Content-Type", "application/json")
    if err := json.NewEncoder(w).Encode(skills); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }
}