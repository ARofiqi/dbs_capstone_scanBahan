"use strict";

const feedbackController = require("../controllers/feedbackController");
const authMiddleware = require("../middleware/authMiddleware");
const { checkRole, roles } = require("../middleware/role");

module.exports = [
  {
    method: "GET",
    path: "/feedback",
    handler: feedbackController.getAllFeedback,
    options: {
      pre: [{ method: authMiddleware }, { method: checkRole([roles.ADMIN]) }],
    },
  },
  {
    method: "GET",
    path: "/feedback/{id}",
    handler: feedbackController.getFeedback,
    options: {
      pre: [{ method: authMiddleware }, { method: checkRole([roles.ADMIN]) }],
    },
  },
  {
    method: "POST",
    path: "/feedback",
    handler: feedbackController.sendFeedback,
  },
  {
    method: "DELETE",
    path: "/feedback/{id}",
    handler: feedbackController.deleteFeedback,
    options: {
      pre: [{ method: authMiddleware }, { method: checkRole([roles.ADMIN]) }],
    },
  },
];
