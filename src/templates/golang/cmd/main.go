package main

import (
	"fmt"
	"golang-app/internal/app/handler"
	"golang-app/internal/app/repository"
	"golang-app/internal/app/service"
	"log"
	"net/http"
)

func main() {
	// Set up repositories and services
	userRepo := repository.NewUserRepository()
	userService := service.NewUserService(userRepo)
	userHandler := handler.NewUserHandler(userService)

	// Set up HTTP server
	http.HandleFunc("/users", userHandler.HandleGetUsers)

	// Start server
	port := ":8080"
	fmt.Printf("Server running on %s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatalf("Could not start server: %s\n", err)
	}
}
