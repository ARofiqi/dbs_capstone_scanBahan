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
    const results = await feedbackService.getAllFeedback();

    return h
      .response({
        status: "success",
        data: results,
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
