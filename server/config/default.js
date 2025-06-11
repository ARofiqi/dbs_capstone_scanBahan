"use strict";

require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "aouer8qy23c948xyr823yc4n83y8q2y3q",
  databaseUrl: process.env.DATABASE_URL || "postgresql://postgres:root@localhost:5432/db_scanbahan?schema=public",
  urlMachineLearning: process.env.ML_SERVICE_URL || "http://localhost:8000",
  emailMe: process.env.EMAIL_USER || "",
  passEmailMe: process.env.EMAIL_PASS || "",
};
