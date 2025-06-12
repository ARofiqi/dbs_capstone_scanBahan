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

async function getUserFavorites(userId, { search = "", page = 1, limit = 10 }) {
  const skip = (page - 1) * limit;

  const whereClause = {
    userId,
    recipe: {
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
  };

  const [favorites, total] = await Promise.all([
    prisma.favorite.findMany({
      where: whereClause,
      skip,
      take: limit,
      include: { recipe: true },
    }),
    prisma.favorite.count({ where: whereClause }),
  ]);

  return {
    favorites,
    page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
  };
}


module.exports = {
  addFavorite,
  removeFavorite,
  getUserFavorites,
};
