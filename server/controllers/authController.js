"use strict";

const authService = require("../services/authService");
const { formatError } = require("../utils/errorUtils");

async function register(request, h) {
  try {
    const user = await authService.registerUser(request.payload);
    console.log("4");
    return h.response({ status: "success", data: user }).code(201);
  } catch (err) {
    console.error("Register error:", err);

    if (err.isBoom) {
      return h.response(err.output.payload).code(err.output.statusCode);
    }

    return h.response({ statusCode: 500, error: "Internal Server Error", message: err.message }).code(500);
  }
}


async function login(request, h) {
  try {
    const { token, user } = await authService.loginUser(request.payload);
    return h.response({ status: "success", data: { token, user } });
  } catch (err) {
    return h.response(formatError(err.message)).code(err.output?.statusCode || 500);
  }
}

module.exports = {
  register,
  login,
};
