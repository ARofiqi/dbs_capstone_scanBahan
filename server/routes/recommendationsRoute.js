"use strict";

const recommendationControllers = require("../controllers/recommendationController");

module.exports = [
  {
    method: "POST",
    path: "/recommendation",
    handler: recommendationControllers.getRecommendation,
  },
  {
    method: "GET",
    path: "/recipe/recomendation",
    handler: recommendationControllers.getRecipesForRecomendation,
  },
];
