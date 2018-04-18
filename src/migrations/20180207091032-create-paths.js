module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable('Paths', {
        pathId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
        },
        value: {
          type: Sequelize.JSONB,
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
        queryInterface.addIndex('Paths', { fields: ['value'] });
      }),
  down: queryInterface => queryInterface.dropTable('Paths'),
};
