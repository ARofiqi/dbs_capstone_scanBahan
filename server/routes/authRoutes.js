'use strict';

const authController = require('../controllers/authController');

module.exports = [
  {
    method: 'POST',
    path: '/auth/register',
    handler: authController.register,
  },
  {
    method: 'POST',
    path: '/auth/login',
    handler: authController.login,
  },
];
