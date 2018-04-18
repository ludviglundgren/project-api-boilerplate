import bcryptjs from 'bcryptjs';
import moment from 'moment';

function user(firstName, lastName, email, role, date, status = 'active') {
  const salt = bcryptjs.genSaltSync(10);
  const password = bcryptjs.hashSync('password', salt);
  const newDate = new Date(date);
  const data = {
    firstName,
    lastName,
    email,
    role,
    password,
    status,
    createdAt: newDate,
    updatedAt: newDate,
  };

  console.log('[User] ', data);

  return data;
}

function rand(min = 0, max = 60) {
  const mi = Math.ceil(min);
  const ma = Math.floor(max);

  return Math.floor(Math.random() * (mi - ma)) + mi;
}

function mockDateTime(days) {
  return moment()
    .subtract(rand(days, days + 3), 'days')
    .subtract(rand(), 'hours')
    .subtract(rand(), 'minutes')
    .subtract(rand(), 'seconds')
    .format('YYYY-MM-DD HH:mm:ss');
}

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Users',
      [
        user(
          'Super Admin',
          'User',
          'superadmin@email.com',
          'Super Admin',
          mockDateTime(20),
        ),
        user('Admin', 'User', 'admin@email.com', 'Admin', mockDateTime(16)),
        user('Default', 'User', 'user@email.com', 'User', mockDateTime(12)),
        user('Referrer', 'User', 'referrer@email.com', 'User', mockDateTime(8)),
        user('Redirect', 'User', 'redirect@email.com', 'User', mockDateTime(4)),
        user(
          'Blocked',
          'User',
          'blocked@email.com',
          'User',
          mockDateTime(0),
          'blocked',
        ),
      ],
      {},
    ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
