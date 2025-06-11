"use strict";

const authRoutes = require("./authRoutes");
const recipeRoutes = require("./dashboardRoute");
const favoriteRoutes = require("./favoriteRoutes");
const recommendationsRoute = require("./recommendationsRoute");
const imageRoute = require("./imageRoute");
const sendFeedback = require("./feedbackRoutes");

module.exports = [...authRoutes, ...recipeRoutes, ...favoriteRoutes, ...recommendationsRoute, ...imageRoute, ...sendFeedback];
