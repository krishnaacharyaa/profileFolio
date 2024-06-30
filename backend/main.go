package main

import (
	"backend/api"
	"backend/config"
	"backend/handlers"
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/rs/cors"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	config.LoadEnv()
	mongoURI := config.GetMongoURI()
	printGoLogo()
	fmt.Println("Connecting to mongodb")
	fmt.Println(mongoURI)

	mux := http.NewServeMux()
	api.RegisterUserRoutes(mux)

	clientOptions := options.Client().ApplyURI(mongoURI)
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal("Error connecting to MongoDB")
		log.Fatal(err)
	}
	handlers.SetClient(client)

	handler := cors.Default().Handler(mux)
	log.Fatal(http.ListenAndServe(":8080", handler))
}

func printGoLogo() {
	logo := `
 ________  ________          ________  ________  ___     
|\   ____\|\   __  \        |\   __  \|\   __  \|\  \    
\ \  \___|\ \  \|\  \       \ \  \|\  \ \  \|\  \ \  \   
 \ \  \  __\ \  \\\  \       \ \   __  \ \   ____\ \  \  
  \ \  \|\  \ \  \\\  \       \ \  \ \  \ \  \___|\ \  \ 
   \ \_______\ \_______\       \ \__\ \__\ \__\    \ \__\
    \|_______|\|_______|        \|__|\|__|\|__|     \|__|
`
	fmt.Println(logo)
	fmt.Println("Starting Go application...")
}
