const UserService = require('../../application/services/UserService');

class UserController {
  static async getUser(req, res) {
    try {
      const user = await UserService.getUser(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async createUser(req, res) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = UserController;
