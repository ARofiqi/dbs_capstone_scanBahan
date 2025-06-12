"use strict";

const prisma = require("./prismaClient");
const Boom = require("@hapi/boom");

async function createRecipe({ title, ingredients, steps, imageUrl, url, category, title_cleaned, total_ingredients, ingredients_cleaned, total_steps }) {
  return await prisma.recipe.create({
    data: {
      title,
      ingredients,
      steps,
      image: imageUrl,
      url,
      category,
      title_cleaned,
      total_ingredients: parseInt(total_ingredients),
      ingredients_cleaned,
      total_steps: parseInt(total_steps),
    },
  });
}

async function findManyRecipes({ limit, offset, search }) {
  const whereClause = search
    ? {
        title: {
          contains: search,
          mode: "insensitive",
        },
      }
    : {};

  const recipes = await prisma.recipe.findMany({
    skip: offset,
    take: limit,
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });

  const total = await prisma.recipe.count({
    where: whereClause,
  });

  return { recipes, total };
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
  const recipe = await prisma.recipe.findUnique({ where: { id: parseInt(id) } });
  if (!recipe) {
    throw Boom.notFound("Recipe tidak ditemukan");
  }
  return recipe;
}

async function updateRecipe(id, { title, ingredients, steps, imageUrl, url, category, title_cleaned, total_ingredients, ingredients_cleaned, total_steps }) {
  const recipe = await prisma.recipe.findUnique({ where: { id: parseInt(id) } });
  if (!recipe) {
    throw Boom.notFound("Recipe tidak ditemukan");
  }

  return await prisma.recipe.update({
    where: { id: parseInt(id) },
    data: {
      title,
      ingredients,
      steps,
      image: imageUrl,
      url,
      category,
      title_cleaned,
      total_ingredients: parseInt(total_ingredients),
      ingredients_cleaned,
      total_steps: parseInt(total_steps),
    },
  });
}

async function deleteRecipe(id) {
  const recipe = await prisma.recipe.findUnique({ where: { id: parseInt(id) } });
  if (!recipe) {
    throw Boom.notFound("Recipe tidak ditemukan");
  }

  return await prisma.recipe.delete({ where: { id: parseInt(id) } });
}

async function getRecipesByIds(ids) {
  const recipes = await prisma.recipe.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  return recipes;
}

module.exports = {
  createRecipe,
  findManyRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getAllRecipesForRecomendation,
  getRecipesByIds,
};
