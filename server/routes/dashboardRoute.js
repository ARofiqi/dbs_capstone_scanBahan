"use strict";

const recipeController = require("../controllers/recipeController");
const authMiddleware = require("../middleware/authMiddleware");
const { checkRole, roles } = require("../middleware/role");

module.exports = [
  {
    method: "GET",
    path: "/recipes",
    handler: recipeController.getAllRecipes,
    options: {
      pre: [{ method: authMiddleware }],
      cors: {
        origin: ["*"],
        additionalHeaders: ["X-Requested-With"],
      },
    },
  },
  {
    method: "GET",
    path: "/recipes/{id}",
    handler: recipeController.getRecipeById,
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
    path: "/recipes",
    handler: recipeController.createRecipe,
    options: {
      pre: [{ method: authMiddleware }, { method: checkRole([roles.ADMIN]) }],
      cors: {
        origin: ["*"],
        additionalHeaders: ["X-Requested-With"],
      },
      payload: {
        maxBytes: 5 * 1024 * 1024,
        output: "stream",
        parse: true,
        multipart: true,
        allow: "multipart/form-data",
      },
    },
  },
  {
    method: "PUT",
    path: "/recipes/{id}",
    handler: recipeController.updateRecipe,
    options: {
      pre: [{ method: authMiddleware }, { method: checkRole([roles.ADMIN]) }],
      cors: {
        origin: ["*"],
        additionalHeaders: ["X-Requested-With"],
      },
      payload: {
        maxBytes: 5 * 1024 * 1024,
        output: "stream",
        parse: true,
        multipart: true,
        allow: "multipart/form-data",
      },
    },
  },
  {
    method: "DELETE",
    path: "/recipes/{id}",
    handler: recipeController.deleteRecipe,
    options: {
      pre: [{ method: authMiddleware }, { method: checkRole([roles.ADMIN]) }],
      cors: {
        origin: ["*"],
        additionalHeaders: ["X-Requested-With"],
      },
    },
  },
];
