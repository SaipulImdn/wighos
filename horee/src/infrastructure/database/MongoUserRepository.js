const UserRepository = require('../../domain/repositories/UserRepository');
const UserModel = require('../models/UserModel'); // Misalkan Anda menggunakan mongoose

class MongoUserRepository extends UserRepository {
  static async findById(id) {
    return await UserModel.findById(id);
  }

  static async create(userData) {
    return await UserModel.create(userData);
  }
}

module.exports = MongoUserRepository;
