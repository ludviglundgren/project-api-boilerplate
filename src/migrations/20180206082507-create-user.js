module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable('Users', {
        userId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        firstName: {
          type: Sequelize.STRING,
        },
        lastName: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
        },
        role: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        status: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() => {
        queryInterface.addIndex('Users', {
          fields: ['firstName', 'lastName', 'email'],
        });
      }),
  down: queryInterface => queryInterface.dropTable('Users'),
};
