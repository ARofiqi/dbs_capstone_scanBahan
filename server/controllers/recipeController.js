'use strict';

const recipeService = require('../services/recipeService');
const { formatError } = require('../utils/errorUtils');

async function createRecipe(request, h) {
  try {
    const recipe = await recipeService.createRecipe(request.payload);
    return h.response({ status: 'success', data: recipe }).code(201);
  } catch (err) {
    return h.response(formatError(err.message)).code(err.output?.statusCode || 500);
  }
}

async function getAllRecipes(request, h) {
  try {
    const recipes = await recipeService.getAllRecipes();
    return h.response({ status: 'success', data: recipes });
  } catch (err) {
    return h.response(formatError(err.message)).code(500);
  }
}

async function getRecipeById(request, h) {
  try {
    const recipe = await recipeService.getRecipeById(request.params.id);
    return h.response({ status: 'success', data: recipe });
  } catch (err) {
    return h.response(formatError(err.message)).code(err.output?.statusCode || 500);
  }
}

async function updateRecipe(request, h) {
  try {
    const recipe = await recipeService.updateRecipe(request.params.id, request.payload);
    return h.response({ status: 'success', data: recipe });
  } catch (err) {
    return h.response(formatError(err.message)).code(err.output?.statusCode || 500);
  }
}

async function deleteRecipe(request, h) {
  try {
    await recipeService.deleteRecipe(request.params.id);
    return h.response({ status: 'success', message: 'Recipe berhasil dihapus' });
  } catch (err) {
    return h.response(formatError(err.message)).code(err.output?.statusCode || 500);
  }
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
