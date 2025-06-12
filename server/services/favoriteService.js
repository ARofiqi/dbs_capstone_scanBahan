"use strict";

const prisma = require("./prismaClient");
const Boom = require("@hapi/boom");

async function addFavorite(userId, recipeId) {
  const existing = await prisma.favorite.findUnique({
    where: {
      userId_recipeId: { userId, recipeId },
    },
  });
  if (!existing) {
    throw Boom.conflict("Recipe sudah ada di favorite");
  }

  return await prisma.favorite.create({
    data: { userId, recipeId },
  });
}

async function removeFavorite(userId, recipeId) {
  const existing = await prisma.favorite.findUnique({
    where: {
      userId_recipeId: { userId, recipeId },
    },
  });
  if (!existing) {
    throw Boom.notFound("Favorite tidak ditemukan");
  }

  return await prisma.favorite.delete({
    where: {
      userId_recipeId: { userId, recipeId },
    },
  });
}

async function getUserFavorites(userId) {
  return await prisma.favorite.findMany({
    where: { userId },
    include: { recipe: true },
  });
}

module.exports = {
  addFavorite,
  removeFavorite,
  getUserFavorites,
};
