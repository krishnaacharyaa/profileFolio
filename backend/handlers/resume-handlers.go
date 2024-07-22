package handlers

import (
	"backend/models"
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func AddResumeHandler(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    userID, err := primitive.ObjectIDFromHex(vars["userID"])
    if err != nil {
        http.Error(w, "Invalid user ID", http.StatusBadRequest)
        return
    }

    var resume models.Resume
    err = json.NewDecoder(r.Body).Decode(&resume)
    if err != nil {
        http.Error(w, "Invalid request body", http.StatusBadRequest)
        return
    }

	resume.ID = primitive.NewObjectID() 

    collection := client.Database("profileFolio").Collection("users")
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

	var user models.User
	err = collection.FindOne(ctx, bson.M{"_id": userID}).Decode(&user)
	if err != nil{
		http.Error(w, "User not found", http.StatusBadRequest)
        return
	}

	if len(user.Resumes) >= 3{
		http.Error(w, "Maximum number of resumes (3) reached", http.StatusBadRequest)
        return
	}

    // Add the new resume to the user's resumes
    update := bson.M{"$push": bson.M{"resumes": resume}}
    result, err := collection.UpdateOne(ctx, bson.M{"_id": userID}, update)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    if result.MatchedCount == 0 {
        http.Error(w, "User not found", http.StatusNotFound)
        return
    }

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]interface{}{
        "message": "Resume added successfully",
        "id":      resume.ID,
    })
}

func UpdateResumeHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userID, err := primitive.ObjectIDFromHex(vars["userID"])
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}
	
	resumeID, err := primitive.ObjectIDFromHex(vars["resumeID"])
	if err != nil {
		http.Error(w, "Invalid resume ID", http.StatusBadRequest)
		return
	}

	var updates map[string]interface{}
	err = json.NewDecoder(r.Body).Decode(&updates)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
    
    updates["_id"] = resumeID

	collection := client.Database("profileFolio").Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Update the specific resume in the user's resumes
	update := bson.M{
		"$set": bson.M{
			"resumes.$[elem]": updates,
		},
	}
	arrayFilters := options.Update().SetArrayFilters(options.ArrayFilters{
		Filters: []interface{}{
			bson.M{"elem._id": resumeID},
		},
	})

	result, err := collection.UpdateOne(ctx, bson.M{"_id": userID}, update, arrayFilters)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if result.MatchedCount == 0 {
		http.Error(w, "Resume not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Resume updated successfully"})
}

func DeleteResumeHandler(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    userID, err := primitive.ObjectIDFromHex(vars["userID"])
    if err != nil {
        http.Error(w, "Invalid user ID", http.StatusBadRequest)
        return
    }

    resumeID, err := primitive.ObjectIDFromHex(vars["resumeID"])
	if err != nil {
		http.Error(w, "Invalid resume ID", http.StatusBadRequest)
		return
	}

    collection := client.Database("profileFolio").Collection("users")
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    // Remove the specific resume from the user's resumes
    update := bson.M{
        "$pull": bson.M{
            "resumes": bson.M{"_id": resumeID},
        },
    }

    result, err := collection.UpdateOne(ctx, bson.M{"_id": userID}, update)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    if result.ModifiedCount == 0 {
        http.Error(w, "Resume not found", http.StatusNotFound)
        return
    }

    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]string{"message": "Resume deleted successfully"})
}