"use strict";

const axios = require("axios");
const { formatError } = require("../utils/errorUtils");
const recipeService = require("../services/recipeService");
const config = require("../config/default");

async function getRecommendation(request, h) {
  try {
    const ingredients = request.payload.ingredients;

    const response = await axios.post(config.urlMachineLearning + "/find-similar-recipes", {
      ingredients: ingredients,
    });
    
    const result = response.data;
    const topMatches = result.top_matches;
    
    
    const recipeIds = topMatches.map(match => match.id);
    console.log(recipeIds);
    const recipesFromDb = await recipeService.getRecipesByIds(recipeIds);

    const recipesWithScore = recipesFromDb.map(recipe => {
      const match = topMatches.find(m => m.id === recipe.id);
      return {
        ...recipe,
        score: match ? match.score : null,
      };
    });

    return h.response({
      status: "success",
      data: {
        input_ingredients: result.input_ingredients,
        recommendations: recipesWithScore,
      },
    });

  } catch (err) {
    console.error("ML Service Error:", err.message);
    return h.response(formatError("Gagal mendapatkan rekomendasi resep")).code(500);
  }
}

async function getRecipesForRecomendation(request, h) {
  try {
    let recipes = await recipeService.getAllRecipesForRecomendation();
    return h.response({ status: "success", data: recipes });
  } catch (err) {
    return h.response(formatError(err.message)).code(500);
  }
}

module.exports = {
  getRecommendation,
  getRecipesForRecomendation,
};
