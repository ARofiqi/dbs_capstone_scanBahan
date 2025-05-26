"use strict";

require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret", // Ganti dengan secret yang kuat di production
  databaseUrl: process.env.DATABASE_URL,
};
