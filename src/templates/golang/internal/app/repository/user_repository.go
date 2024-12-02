package repository

import (
	"golang-app/internal/app/domain"
)

type UserRepository interface {
	FetchAll() ([]domain.User, error)
}

type userRepository struct {
	// Can later be connected to a database
}

func NewUserRepository() UserRepository {
	return &userRepository{}
}

func (r *userRepository) FetchAll() ([]domain.User, error) {
	// Simulating database data retrieval
	users := []domain.User{
		{ID: 1, Name: "Alice", Email: "alice@example.com"},
		{ID: 2, Name: "Bob", Email: "bob@example.com"},
	}

	return users, nil
}
