'use strict';

const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');

module.exports = [
  {
    method: 'GET',
    path: '/recipes',
    handler: recipeController.getAllRecipes,
  },
  {
    method: 'GET',
    path: '/recipes/{id}',
    handler: recipeController.getRecipeById,
  },
  {
    method: 'POST',
    path: '/recipes',
    handler: recipeController.createRecipe,
    options: {
      pre: [{ method: authMiddleware }],
    },
  },
  {
    method: 'PUT',
    path: '/recipes/{id}',
    handler: recipeController.updateRecipe,
    options: {
      pre: [{ method: authMiddleware }],
    },
  },
  {
    method: 'DELETE',
    path: '/recipes/{id}',
    handler: recipeController.deleteRecipe,
    options: {
      pre: [{ method: authMiddleware }],
    },
  },
];
