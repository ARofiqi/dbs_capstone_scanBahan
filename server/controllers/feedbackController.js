"use strict";

const feedbackService = require("../services/feedbackService");
const { formatError } = require("../utils/errorUtils");
const { sendFeedbackEmail } = require("../utils/emailUtils");

async function sendFeedback(request, h) {
  try {
    const { name, email, message } = request.payload;

    if (!name || !email || !message) {
      return h
        .response({
          status: "fail",
          message: "name, email, dan message wajib diisi.",
        })
        .code(400);
    }

    const result = await feedbackService.saveFeedback({ name, email, message });

    await sendFeedbackEmail({ name, email, message });

    return h
      .response({
        status: "success",
        message: "Feedback berhasil dikirim dan telah masuk ke email.",
        data: result,
      })
      .code(201);
  } catch (err) {
    console.error(err);
    return h.response(formatError(err)).code(500);
  }
}

async function getAllFeedback(request, h) {
  try {
    const { page = 1, limit = 10, search = "" } = request.query;

    const results = await feedbackService.getAllFeedback({
      page: parseInt(page),
      limit: parseInt(limit),
      search: search.toLowerCase(),
    });

    return h
      .response({
        status: "success",
        data: results.data,
        meta: {
          total: results.total,
          page,
          limit,
        },
      })
      .code(200);
  } catch (err) {
    console.error(err);
    return h.response(formatError(err)).code(500);
  }
}

async function getFeedback(request, h) {
  try {
    const { id } = request.params;
    const result = await feedbackService.getFeedbackById(id);

    if (!result) {
      return h.response({ status: "fail", message: "Feedback tidak ditemukan." }).code(404);
    }

    return h
      .response({
        status: "success",
        data: result,
      })
      .code(200);
  } catch (err) {
    console.error(err);
    return h.response(formatError(err)).code(500);
  }
}

async function deleteFeedback(request, h) {
  try {
    const { id } = request.params;
    const deleted = await feedbackService.deleteFeedbackById(id);

    return h
      .response({
        status: "success",
        message: "Feedback berhasil dihapus.",
        data: deleted,
      })
      .code(200);
  } catch (err) {
    console.error(err);
    return h.response(formatError(err)).code(500);
  }
}

module.exports = {
  sendFeedback,
  getFeedback,
  deleteFeedback,
  getAllFeedback,
};
