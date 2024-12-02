package service

import (
	"golang-app/internal/app/domain"
	"golang-app/internal/app/repository"
)

type UserService interface {
	GetUsers() ([]domain.User, error)
}

type userService struct {
	userRepo repository.UserRepository
}

func NewUserService(repo repository.UserRepository) UserService {
	return &userService{userRepo: repo}
}

func (s *userService) GetUsers() ([]domain.User, error) {
	return s.userRepo.FetchAll()
}
