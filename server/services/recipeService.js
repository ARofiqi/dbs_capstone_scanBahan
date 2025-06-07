"use strict";

const prisma = require("./prismaClient");
const Boom = require("@hapi/boom");

async function createRecipe({ title, ingredients, steps, image }) {
  return await prisma.recipe.create({
    data: { title, ingredients, steps, image },
  });
}

async function getAllRecipes() {
  return await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
  });
}

async function getRecipeById(id) {
  const recipe = await prisma.recipe.findUnique({ where: { id } });
  if (!recipe) {
    throw Boom.notFound("Recipe tidak ditemukan");
  }
  return recipe;
}

async function updateRecipe(id, { title, ingredients, steps, image }) {
  const recipe = await prisma.recipe.findUnique({ where: { id } });
  if (!recipe) {
    throw Boom.notFound("Recipe tidak ditemukan");
  }

  return await prisma.recipe.update({
    where: { id },
    data: { title, ingredients, steps, image },
  });
}

async function deleteRecipe(id) {
  // Pastikan resep ada
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
};
