const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("Password1!", 10);

    return queryInterface.bulkInsert("Users", [
      {
        name: "Никита",
        email: "nikita@mail.ru",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Анна",
        email: "anna@mail.ru",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
