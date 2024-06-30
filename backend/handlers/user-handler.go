package handlers

import (
	"backend/models"
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var client *mongo.Client

func SetClient(mongoClient *mongo.Client) {
    client = mongoClient
}

func SignUpHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
        return
    }

    var user models.User
    var authUser models.AuthUser
    if err := json.NewDecoder(r.Body).Decode(&authUser); err != nil {
        http.Error(w, "Error decoding request body", http.StatusBadRequest)
        return
    }


    userCollection := client.Database("profileFolio").Collection("users")
    authCollection := client.Database("profileFolio").Collection("auth_users")
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    // Check if the user already exists
    filter_auth := bson.M{"email": authUser.Email}
    filter_user := bson.M{"basics.email": authUser.Email}
    auth_err := authCollection.FindOne(ctx, filter_auth).Decode(&authUser)
    user_err := userCollection.FindOne(ctx, filter_user).Decode(&user)
    if auth_err == nil {
        http.Error(w, "User already exists", http.StatusConflict)
        return
    } else if user_err == nil {
        http.Error(w, "User already exists", http.StatusConflict)
        return

    } else if auth_err != mongo.ErrNoDocuments {
        http.Error(w, "Error checking user existence", http.StatusInternalServerError)
        return
    }

    // Insert into auth_users collection
    _, auth_err = authCollection.InsertOne(ctx, authUser)
    if auth_err != nil {
        http.Error(w, "Error saving auth user", http.StatusInternalServerError)
        return
    }

    // Create a new User object with only email
    user = models.User{
        Basics: models.Basics{
            Email: authUser.Email,
        },
    }

    // Insert into users collection
    _, user_err = userCollection.InsertOne(ctx, user)
    if user_err != nil {
        http.Error(w, "Error saving user", http.StatusInternalServerError)
        return
    }

    var new_user models.User
    collection := client.Database("profileFolio").Collection("users")
    err := collection.FindOne(ctx, bson.M{"basics.email": authUser.Email}).Decode(&new_user)
    if err != nil {
        http.Error(w, "User not found", http.StatusNotFound)
        return
    }

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(new_user)
}

func SignInHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
        return
    }

    var credentials struct {
        Email    string `json:"email"`
        Password string `json:"password"`
    }
    if err := json.NewDecoder(r.Body).Decode(&credentials); err != nil {
        http.Error(w, "Error decoding request body", http.StatusBadRequest)
        return
    }

    var authUser models.AuthUser
    collection := client.Database("profileFolio").Collection("auth_users")
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    err := collection.FindOne(ctx, bson.M{"email": credentials.Email, "password": credentials.Password}).Decode(&authUser)
    if err != nil {
        http.Error(w, "Invalid user credentials", http.StatusUnauthorized)
        return
    }

    // Returning user schema
    var user models.User
    collection = client.Database("profileFolio").Collection("users")
    err = collection.FindOne(ctx, bson.M{"basics.email": credentials.Email}).Decode(&user)
    if err != nil {
        http.Error(w, "User not found", http.StatusNotFound)
        return
    }

    json.NewEncoder(w).Encode(user)
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