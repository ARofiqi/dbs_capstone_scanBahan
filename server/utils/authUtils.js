"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/default");

const saltRounds = 10;

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

function generateToken(payload) {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: "7d" });
}

function verifyToken(token) {
  return jwt.verify(token, config.jwtSecret);
}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
};
