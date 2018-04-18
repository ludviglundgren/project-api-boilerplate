module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.addColumn('Users', 'redirect', {
        type: Sequelize.STRING,
        defaultValue: '',
      }),
    ]),

  down: queryInterface =>
    Promise.all([queryInterface.removeColumn('Users', 'redirect')]),
};
