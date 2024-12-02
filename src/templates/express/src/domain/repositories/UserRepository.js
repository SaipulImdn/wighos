class UserRepository {
    static async findById(id) {
      // Interaksi dengan database, misalnya MongoDB
      // Contoh:
      // return await UserModel.findById(id);
    }
  
    static async create(userData) {
      // Simpan data user ke database
      // Contoh:
      // return await UserModel.create(userData);
    }
  }
  
  module.exports = UserRepository;
  