module.exports = {
  async up(queryInterface, Sequelize) {
    // Сначала получаем пользователей
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM "Users";',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (!users.length) {
      throw new Error("Users not found. Run users seed first");
    }

    return queryInterface.bulkInsert("Posts", [
      {
        title: "Первый пост",
        content: "Содержание первого поста",
        user_id: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Второй пост",
        content: "Содержание второго поста",
        user_id: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Posts", null, {});
  },
};
