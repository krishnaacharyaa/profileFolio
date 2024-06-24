package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/rs/cors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type User struct {
    Basics struct {
        Name     string `json:"name"`
        Label    string `json:"label"`
        Email    string `json:"email"`
        Phone    string `json:"phone"`
        URL      string `json:"url"`
        Summary  string `json:"summary"`
        Location struct {
            Address     string `json:"address"`
            PostalCode  string `json:"postalCode"`
            City        string `json:"city"`
            CountryCode string `json:"countryCode"`
            Region      string `json:"region"`
        } `json:"location"`
        Profiles []struct {
            Network  string `json:"network"`
            Username string `json:"username"`
            URL      string `json:"url"`
        } `json:"profiles"`
    } `json:"basics"`
    Work []struct {
        Name       string   `json:"name"`
        Position   string   `json:"position"`
        URL        string   `json:"url"`
        StartDate  string   `json:"startDate"`
        EndDate    string   `json:"endDate"`
        Summary    string   `json:"summary"`
        Highlights []string `json:"highlights"`
    } `json:"work"`
    Education []struct {
        Institution string   `json:"institution"`
        URL         string   `json:"url"`
        Area        string   `json:"area"`
        StudyType   string   `json:"studyType"`
        StartDate   string   `json:"startDate"`
        EndDate     string   `json:"endDate"`
        Score       string   `json:"score"`
        Courses     []string `json:"courses"`
    } `json:"education"`
    Projects []struct {
        Name        string   `json:"name"`
        StartDate   string   `json:"startDate"`
        EndDate     string   `json:"endDate"`
        Description string   `json:"description"`
        Highlights  []string `json:"highlights"`
        URL         string   `json:"url"`
    } `json:"projects"`
}

var client *mongo.Client

func handler(w http.ResponseWriter, r *http.Request) {
    collection := client.Database("userdb").Collection("userdb")
    var user User
    err := collection.FindOne(context.Background(), bson.M{}).Decode(&user)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    json.NewEncoder(w).Encode(user)
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/api/user", handler) 
    var err error
    clientOptions := options.Client().ApplyURI("mongodb://admin:password@mongodb:27017")
    client, err = mongo.Connect(context.Background(), clientOptions)
    if err != nil {
        log.Fatal(err)
    }
   // Use the cors package to allow cross-origin requests
    
   
    handler := cors.Default().Handler(mux)
    
    log.Fatal(http.ListenAndServe(":8080", handler))
}
