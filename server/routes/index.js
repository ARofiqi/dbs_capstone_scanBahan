'use strict';

const authRoutes = require('./authRoutes');
const recipeRoutes = require('./recipeRoutes');
const favoriteRoutes = require('./favoriteRoutes');

module.exports = [
  ...authRoutes,
  ...recipeRoutes,
  ...favoriteRoutes,
];
