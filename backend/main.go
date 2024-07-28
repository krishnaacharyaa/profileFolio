// package main

// import (
// 	"backend/api"
// 	"backend/config"
// 	"backend/handlers"
// 	"context"
// 	"fmt"
// 	"log"
// 	"net/http"
// 	"os"

// 	"github.com/gorilla/mux"
// 	"github.com/rs/cors"
// 	"go.mongodb.org/mongo-driver/mongo"
// 	"go.mongodb.org/mongo-driver/mongo/options"
// )

// func main() {
// 	config.LoadEnv()
// 	mongoURI := config.GetMongoURI()
// 	printGoLogo()
// 	fmt.Println("Connecting to mongodb")
// 	fmt.Println(mongoURI)

// 	// Setup router
// 	router := mux.NewRouter()
// 	api.RegisterUserRoutes(router)

// 	// Setup MongoDB connection
// 	clientOptions := options.Client().ApplyURI(mongoURI)
// 	client, err := mongo.Connect(context.Background(), clientOptions)
// 	if err != nil {
// 		log.Fatal("Error connecting to MongoDB")
// 		log.Fatal(err)
// 	}
// 	handlers.SetClient(client)

// 	// Setup CORS
// 	corsOptions := cors.New(cors.Options{
// 		AllowedOrigins:   []string{"http://localhost:3000"}, // Adjust according to your frontend URL
// 		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
// 		AllowedHeaders:   []string{"Authorization", "Content-Type"},
// 		AllowCredentials: true,
// 		Debug:            true,
// 	})

// 	// Start server
// 	handler := corsOptions.Handler(router)
// 	log.Fatal(http.ListenAndServe(":8080", handler))
// }

// func printGoLogo() {
// 	logo := `
//  ________  ________          ________  ________  ___
// |\   ____\|\   __  \        |\   __  \|\   __  \|\  \
// \ \  \___|\ \  \|\  \       \ \  \|\  \ \  \|\  \ \  \
//  \ \  \  __\ \  \\\  \       \ \   __  \ \   ____\ \  \
//   \ \  \|\  \ \  \\\  \       \ \  \ \  \ \  \___|\ \  \
//    \ \_______\ \_______\       \ \__\ \__\ \__\    \ \__\
//     \|_______|\|_______|        \|__|\|__|\|__|     \|__|
// `
// 	fmt.Println(logo)

// 	fmt.Printf("NEXTAUTH_SECRET in Go: %s\n", os.Getenv("NEXTAUTH_SECRET"))
// 	fmt.Println("Starting Go application...")
// }

package main

import (
	"backend/api"
	"fmt"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	http.HandleFunc("/", api.Handler)

	fmt.Printf("Server is running on http://localhost:%s\n", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		fmt.Printf("Error starting server: %s\n", err)
	}
}
