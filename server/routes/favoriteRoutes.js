"use strict";

const favoriteController = require("../controllers/favoriteController");
const authMiddleware = require("../middleware/authMiddleware");

module.exports = [
  {
    method: "GET",
    path: "/favorites",
    handler: favoriteController.getUserFavorites,
    options: {
      pre: [{ method: authMiddleware }],
      cors: {
        origin: ["*"],
        additionalHeaders: ["X-Requested-With"],
      },
    },
  },
  {
    method: "POST",
    path: "/favorites",
    handler: favoriteController.addFavorite,
    options: {
      pre: [{ method: authMiddleware }],
      cors: {
        origin: ["*"],
        additionalHeaders: ["X-Requested-With"],
      },
    },
  },
  {
    method: "DELETE",
    path: "/favorites/{recipeId}",
    handler: favoriteController.removeFavorite,
    options: {
      pre: [{ method: authMiddleware }],
      cors: {
        origin: ["*"],
        additionalHeaders: ["X-Requested-With"],
      },
    },
  },
];
