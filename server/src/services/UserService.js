const { User } = require("../db/models");

class UserService {
  static async create(data) {
    const user = await User.create(data);
    return user;
  }

  static async getByEmail(email) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  static async getById(userId) {
    const user = await User.findByPk(userId);
    return user;
  }

  static async getAll() {
    const users = await User.findAll();
    return users;
  }
}

module.exports = UserService;
