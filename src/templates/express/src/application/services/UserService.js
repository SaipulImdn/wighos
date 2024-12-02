const UserRepository = require('../../domain/repositories/UserRepository');

class UserService {
  static async getUser(id) {
    return await UserRepository.findById(id);
  }

  static async createUser(userData) {
    return await UserRepository.create(userData);
  }
}

module.exports = UserService;
