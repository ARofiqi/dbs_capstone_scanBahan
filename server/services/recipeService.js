"use strict";

const prisma = require("./prismaClient");
const Boom = require("@hapi/boom");

async function createRecipe({ title, ingredients, steps, image, url, category, title_cleaned, total_ingredients, ingredients_cleaned, total_steps }) {
  return await prisma.recipe.create({
    data: {
      title,
      ingredients,
      steps,
      image,
      url,
      category,
      title_cleaned,
      total_ingredients,
      ingredients_cleaned,
      total_steps,
    },
  });
}

async function getAllRecipes() {
  return await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
  });
}

async function getAllRecipesForRecomendation() {
  return await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title_cleaned: true,
      ingredients_cleaned: true,
    },
  });
}

async function getRecipeById(id) {
  const recipe = await prisma.recipe.findUnique({ where: { id } });
  if (!recipe) {
    throw Boom.notFound("Recipe tidak ditemukan");
  }
  return recipe;
}

async function updateRecipe(id, { title, ingredients, steps, image, url, category, title_cleaned, total_ingredients, ingredients_cleaned, total_steps }) {
  const recipe = await prisma.recipe.findUnique({ where: { id } });
  if (!recipe) {
    throw Boom.notFound("Recipe tidak ditemukan");
  }

  return await prisma.recipe.update({
    where: { id },
    data: {
      title,
      ingredients,
      steps,
      image,
      url,
      category,
      title_cleaned,
      total_ingredients,
      ingredients_cleaned,
      total_steps,
    },
  });
}

async function deleteRecipe(id) {
  const recipe = await prisma.recipe.findUnique({ where: { id } });
  if (!recipe) {
    throw Boom.notFound("Recipe tidak ditemukan");
  }

  return await prisma.recipe.delete({ where: { id } });
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getAllRecipesForRecomendation
};
