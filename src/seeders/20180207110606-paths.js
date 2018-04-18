const DEFAULT_PATHS = JSON.stringify({
  allowedPaths: ['/my-profile', '/admin', '/admin/dashboard'],
  exludedPaths: [],
});

function userPaths(queryInterface, email, value) {
  return queryInterface
    .rawSelect(
      'Users',
      {
        where: { email },
      },
      ['userId'],
    )
    .then(userId => {
      const date = new Date();

      console.log('[User Paths]', email, value);

      return {
        userId,
        value,
        createdAt: date,
        updatedAt: date,
      };
    });
}

module.exports = {
  up: queryInterface =>
    Promise.all([
      userPaths(
        queryInterface,
        'superadmin@email.com',
        JSON.stringify({ allowedPaths: ['*'] }),
      ),
      userPaths(
        queryInterface,
        'admin@email.com',
        JSON.stringify({
          allowedPaths: ['*'],
          excludedPaths: ['/admin/users/delete'],
        }),
      ),
      userPaths(
        queryInterface,
        'user@email.com',
        JSON.stringify({
          allowedPaths: [
            '/my-profile',
            '/admin',
            '/admin/dashboard',
            '/admin/users',
            '/admin/users/:userId',
            '/admin/settings',
          ],
          exludedPaths: [],
        }),
      ),
      userPaths(queryInterface, 'referrer@email.com', DEFAULT_PATHS),
      userPaths(queryInterface, 'redirect@email.com', DEFAULT_PATHS),
      userPaths(queryInterface, 'blocked@email.com', DEFAULT_PATHS),
    ]).then(promises => queryInterface.bulkInsert('Paths', promises, {})),

  down: queryInterface => queryInterface.bulkDelete('Paths', null, {}),
};
