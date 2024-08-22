package handlers

import (
	"backend/middleware"
	"backend/models"
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

var client *mongo.Client

func SetClient(mongoClient *mongo.Client) {
	client = mongoClient
}

func GetUserByIDHandler(w http.ResponseWriter, r *http.Request) {
	// Get the user ID from the URL parameter
	vars := mux.Vars(r)
	userID, err := primitive.ObjectIDFromHex(vars["id"])
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	collection := client.Database("profileFolio").Collection("users")
	var user models.User
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Find user by ID
	err = collection.FindOne(ctx, bson.M{"_id": userID}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			http.Error(w, "User not found", http.StatusNotFound)
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func GetUserByEmailHandler(w http.ResponseWriter, r *http.Request) {
	// Get the email from the URL parameter
	vars := mux.Vars(r)
	email := vars["email"]

	collection := client.Database("profileFolio").Collection("users")
	var user models.User
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Find user by email
	err := collection.FindOne(ctx, bson.M{"basics.email": email}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			http.Error(w, "User not found", http.StatusNotFound)
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func GetUserByUsernameHandler(w http.ResponseWriter, r *http.Request) {
	// Get the username from the URL parameter
	vars := mux.Vars(r)
	username := vars["username"]

	collection := client.Database("profileFolio").Collection("users")
	var user models.User
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Find user by username
	err := collection.FindOne(ctx, bson.M{"basics.username": username}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			http.Error(w, "User not found", http.StatusNotFound)
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func UpdateUserByEmailHandler(w http.ResponseWriter, r *http.Request) {
	// Get the email from the URL parameter
	vars := mux.Vars(r)
	email := vars["email"]

	// Parse the request body
	var updates map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&updates)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Prepare the update document
	update := bson.M{}
	for key, value := range updates {
		update[key] = value
	}

	collection := client.Database("profileFolio").Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Perform the update
	result, err := collection.UpdateOne(
		ctx,
		bson.M{"basics.email": email},
		bson.M{"$set": update},
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if result.MatchedCount == 0 {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "User updated successfully"})
}

func UpdateUserByUsernameHandler(w http.ResponseWriter, r *http.Request) {
	// Get the username from the URL parameter
	vars := mux.Vars(r)
	username := vars["username"]

	// Parse the request body
	var updates map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&updates)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Prepare the update document
	update := bson.M{}
	for key, value := range updates {
		update[key] = value
	}

	collection := client.Database("profileFolio").Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Perform the update
	result, err := collection.UpdateOne(
		ctx,
		bson.M{"basics.username": username},
		bson.M{"$set": update},
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if result.MatchedCount == 0 {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "User updated successfully"})
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

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(authUser.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Error hashing password", http.StatusInternalServerError)
		return
	}
	authUser.Password = string(hashedPassword)

	userCollection := client.Database("profileFolio").Collection("users")
	authCollection := client.Database("profileFolio").Collection("auth_users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Check if the user already exists
	filter_email := bson.M{"email": authUser.Email}
	filter_username := bson.M{"username": authUser.Username}

	email_err := authCollection.FindOne(ctx, filter_email).Decode(&authUser)
	username_err := authCollection.FindOne(ctx, filter_username).Decode(&authUser)

	if email_err == nil {
		http.Error(w, "Email already exists", http.StatusConflict)
		return
	} else if username_err == nil {
		http.Error(w, "Username already exists", http.StatusConflict)
		return
	} else if email_err != mongo.ErrNoDocuments {
		http.Error(w, "Error checking user existence", http.StatusInternalServerError)
		return
	}

	// Insert into auth_users collection
	_, auth_err := authCollection.InsertOne(ctx, authUser)
	if auth_err != nil {
		http.Error(w, "Error saving user credentials", http.StatusInternalServerError)
		return
	}

	defaultResume := models.Resume{
		Basics: models.Basics{
			Email: authUser.Email,
		},
	}

	// Create a new User object with only email
	user = models.User{
		Basics: models.Basics{
			Username: authUser.Username,
			Email:    authUser.Email,
		},
		Resumes: []models.Resume{defaultResume},

		Work:         []models.WorkExperience{},
		Education:    []models.EducationDetail{},
		Certificates: []models.Certificate{},
		Skills:       []models.Skill{},
		Languages:    []models.Language{},
		Interests:    []models.Interest{},
		Projects:     []models.Project{},
	}

	// Insert into users collection
	_, user_err := userCollection.InsertOne(ctx, user)
	if user_err != nil {
		http.Error(w, "Error saving user object", http.StatusInternalServerError)
		return
	}

	var new_user models.User
	collection := client.Database("profileFolio").Collection("users")
	err = collection.FindOne(ctx, bson.M{"basics.email": authUser.Email}).Decode(&new_user)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// Generate JWT token
	token, err := middleware.GenerateJWT()
	if err != nil {
		http.Error(w, "Error generating token", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	response := map[string]interface{}{
		"message":     "User created successfully",
		"id":          new_user.ID,
		"accessToken": token,
		"user":        new_user,
	}
	json.NewEncoder(w).Encode(response)
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

	// Find user by email
	err := collection.FindOne(ctx, bson.M{"email": credentials.Email}).Decode(&authUser)
	if err != nil {
		http.Error(w, "Invalid user credentials", http.StatusUnauthorized)
		return
	}

	// Check hashed password
	err = bcrypt.CompareHashAndPassword([]byte(authUser.Password), []byte(credentials.Password))
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

	// Generate JWT token
	token, err := middleware.GenerateJWT()
	if err != nil {
		http.Error(w, "Error generating token", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"id":          user.ID,
		"user":        user.Basics,
		"accessToken": token,
	}

	json.NewEncoder(w).Encode(response)
}

func GetUserHandler(w http.ResponseWriter, r *http.Request) {
	collection := client.Database("profileFolio").Collection("users")
	var user models.User
	err := collection.FindOne(context.Background(), bson.M{}).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

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

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(skills); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func GetSkillsByUserIDHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userID, err := primitive.ObjectIDFromHex(vars["id"])
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	collection := client.Database("profileFolio").Collection("users")
	var user models.User

	err = collection.FindOne(ctx, bson.M{"_id": userID}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			http.Error(w, "User not found", http.StatusNotFound)
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	if len(user.Skills) == 0 {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode([]models.SkillCollection{})
		return
	}

	// Collect skill IDs from user skills
	var skillIDs []primitive.ObjectID
	for _, skill := range user.Skills {
		skillIDs = append(skillIDs, skill.Keywords...)
	}

	if len(skillIDs) == 0 {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode([]models.SkillCollection{})
		return
	}

	skillCollection := client.Database("profileFolio").Collection("skills")
	filter := bson.M{"_id": bson.M{"$in": skillIDs}}

	cursor, err := skillCollection.Find(ctx, filter)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var skills []models.SkillCollection
	if err = cursor.All(ctx, &skills); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(skills)
}

func GetSkillsByUsernameHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	username := vars["username"]

	collection := client.Database("profileFolio").Collection("users")
	var user models.User
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err := collection.FindOne(ctx, bson.M{"basics.username": username}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			http.Error(w, "User not found", http.StatusNotFound)
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	if len(user.Skills) == 0 {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode([]models.SkillCollection{})
		return
	}

	// Collect skill IDs from user skills
	var skillIDs []primitive.ObjectID
	for _, skill := range user.Skills {
		skillIDs = append(skillIDs, skill.Keywords...)
	}

	if len(skillIDs) == 0 {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode([]models.SkillCollection{})
		return
	}

	skillCollection := client.Database("profileFolio").Collection("skills")
	filter := bson.M{"_id": bson.M{"$in": skillIDs}}

	cursor, err := skillCollection.Find(ctx, filter)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var skills []models.SkillCollection
	if err = cursor.All(ctx, &skills); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(skills)
}

func GetSkillsByEmailHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	email := vars["email"]

	collection := client.Database("profileFolio").Collection("users")
	var user models.User
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err := collection.FindOne(ctx, bson.M{"basics.email": email}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			http.Error(w, "User not found", http.StatusNotFound)
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	if len(user.Skills) == 0 {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode([]models.SkillCollection{})
		return
	}

	// Collect skill IDs from user skills
	var skillIDs []primitive.ObjectID
	for _, skill := range user.Skills {
		skillIDs = append(skillIDs, skill.Keywords...)
	}

	if len(skillIDs) == 0 {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode([]models.SkillCollection{})
		return
	}

	skillCollection := client.Database("profileFolio").Collection("skills")
	filter := bson.M{"_id": bson.M{"$in": skillIDs}}

	cursor, err := skillCollection.Find(ctx, filter)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var skills []models.SkillCollection
	if err = cursor.All(ctx, &skills); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(skills)
}

func AddUserHandler(w http.ResponseWriter, r *http.Request) {
	var newUser models.User
	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	collection := client.Database("profileFolio").Collection("users")

	// Check if user already exists
	existingUser := models.User{}
	err = collection.FindOne(context.Background(), bson.M{"email": bson.M{"$regex": primitive.Regex{Pattern: "^" + newUser.Basics.Email + "$", Options: "i"}}}).Decode(&existingUser)
	if err == nil {
		http.Error(w, "User with this email already exists", http.StatusConflict)
		return
	} else if err != mongo.ErrNoDocuments {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Insert new user without specifying ID
	result, err := collection.InsertOne(context.Background(), newUser)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the auto-generated ID
	insertedID := result.InsertedID.(primitive.ObjectID)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "User added successfully",
		"id":      insertedID.Hex(),
	})
}

func UpdateUserHandler(w http.ResponseWriter, r *http.Request) {
	// Get the user ID from the URL parameter
	vars := mux.Vars(r)
	userID, err := primitive.ObjectIDFromHex(vars["id"])
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	// Parse the request body
	var updates map[string]interface{}
	err = json.NewDecoder(r.Body).Decode(&updates)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Prepare the update document
	update := bson.M{}
	for key, value := range updates {
		update[key] = value
	}

	collection := client.Database("profileFolio").Collection("users")

	// Perform the update
	result, err := collection.UpdateOne(
		context.Background(),
		bson.M{"_id": userID},
		bson.M{"$set": update},
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if result.MatchedCount == 0 {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "User updated successfully"})
}
