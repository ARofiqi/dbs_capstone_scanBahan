"use strict";

const { verifyToken } = require("../utils/authUtils");
const Boom = require("@hapi/boom");

async function authMiddleware(request, h) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw Boom.unauthorized("Missing authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = verifyToken(token);

    // Attach user info ke request.auth.credentials
    request.auth = {
      isAuthenticated: true,
      credentials: decoded,
    };

    return h.continue;
  } catch (err) {
    throw Boom.unauthorized("Invalid or expired token");
  }
}

module.exports = authMiddleware;
