module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable('Sessions', {
        sessionId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
        },
        userAgent: {
          type: Sequelize.STRING,
        },
        ipAddress: {
          type: Sequelize.STRING,
        },
        token: {
          type: Sequelize.TEXT,
        },
        signedOut: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
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
        queryInterface.addIndex('Sessions', { fields: ['userId'] });
      }),
  down: queryInterface => queryInterface.dropTable('Sessions'),
};
