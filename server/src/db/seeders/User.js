const { User } = require("../models");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Никита",
        email: "123@mail.ru", // Исправлен email - добавлен символ @
        password: "Password1!",
        createdAt: new Date(), // Добавлены обязательные поля createdAt и updatedAt
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
