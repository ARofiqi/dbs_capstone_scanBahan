"use strict";

const feedbackController = require("../controllers/feedbackController");

module.exports = [
  {
    method: "POST",
    path: "/feedback",
    handler: feedbackController.sendFeedback,
  },
  {
    method: "GET",
    path: "/feedback/{id}",
    handler: feedbackController.getFeedback,
  },
  {
    method: "DELETE",
    path: "/feedback/{id}",
    handler: feedbackController.deleteFeedback,
  },
  {
    method: "GET",
    path: "/feedback",
    handler: feedbackController.getAllFeedback,
  },
];
