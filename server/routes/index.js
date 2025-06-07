'use strict';

const authRoutes = require('./authRoutes');
const recipeRoutes = require('./dashboardRoute');
const favoriteRoutes = require('./favoriteRoutes');

module.exports = [
  ...authRoutes,
  ...recipeRoutes,
  ...favoriteRoutes,
];
