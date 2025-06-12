"use strict";

const favoriteService = require("../services/favoriteService");
const { formatError } = require("../utils/errorUtils");

async function addFavorite(request, h) {
  try {
    const userId = request.auth.credentials.id;
    const recipeId = request.payload.recipeId;
    const favorite = await favoriteService.addFavorite(userId, recipeId);
    return h.response({ status: "success", data: favorite }).code(201);
  } catch (err) {
    return h.response(formatError(err.message)).code(err.output?.statusCode || 500);
  }
}

async function removeFavorite(request, h) {
  try {
    const userId = request.auth.credentials.id;
    const recipeId = parseInt(request.params.recipeId);
    await favoriteService.removeFavorite(userId, recipeId);
    return h.response({ status: "success", message: "Favorite berhasil dihapus" });
  } catch (err) {
    return h.response(formatError(err.message)).code(err.output?.statusCode || 500);
  }
}

async function getUserFavorites(request, h) {
  try {
    const userId = request.auth.credentials.id;
    const favorites = await favoriteService.getUserFavorites(userId);
    return h.response({ status: "success", data: favorites });
  } catch (err) {
    return h.response(formatError(err.message)).code(500);
  }
}

module.exports = {
  addFavorite,
  removeFavorite,
  getUserFavorites,
};
