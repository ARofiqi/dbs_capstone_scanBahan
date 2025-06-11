"use strict";

const recommendationControllers = require("../controllers/recommendationController");

const routes = [
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

module.exports = routes;
