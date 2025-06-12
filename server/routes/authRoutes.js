"use strict";

const Joi = require("joi");
const Boom = require("@hapi/boom");
const authController = require("../controllers/authController");

const userSchemas = {
  baseUser: Joi.object({
    id: Joi.string().guid().required(),
    photo: Joi.string().uri().allow(null, ""),
    fullname: Joi.string().required(),
    username: Joi.string().required(),
    role: Joi.string().valid("USER", "ADMIN").default("USER"),
    email: Joi.string().email().required(),
    createdAt: Joi.date().iso(),
  }),

  register: Joi.object({
    photo: Joi.string().uri().allow(null, ""),
    fullname: Joi.string().min(3).max(100).required().messages({
      "string.min": "Nama lengkap minimal 3 karakter",
      "string.max": "Nama lengkap maksimal 100 karakter",
      "any.required": "Nama lengkap wajib diisi",
    }),
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      "string.alphanum": "Username hanya boleh berisi huruf dan angka",
      "string.min": "Username minimal 3 karakter",
      "string.max": "Username maksimal 30 karakter",
      "any.required": "Username wajib diisi",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Format email tidak valid",
      "any.required": "Email wajib diisi",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password minimal 6 karakter",
      "any.required": "Password wajib diisi",
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
      "any.only": "Konfirmasi password tidak cocok",
      "any.required": "Konfirmasi password wajib diisi",
    }),
  }),

  login: Joi.object({
    email: Joi.string().required().messages({
      "any.required": "Email wajib diisi",
    }),
    password: Joi.string().required().messages({
      "any.required": "Password wajib diisi",
    }),
  }),
};

const formatValidationError = (err) => {
  const details = err.details || [];
  return details.map((detail) => ({
    field: detail.path.join("."),
    message: detail.message.replace(/['"]+/g, ""),
    type: detail.type,
  }));
};

module.exports = [
  {
    method: "POST",
    path: "/auth/register",
    handler: authController.register,
    options: {
      validate: {
        payload: userSchemas.register,
        failAction: (request, h, err) => {
          const error = Boom.badRequest("Validasi gagal");
          error.output.payload.errors = formatValidationError(err);
          throw error;
        },
      },
      response: {
        schema: Joi.object({
          status: Joi.string().valid("success").required(),
          data: userSchemas.baseUser,
        }),
      },
      cors: {
        origin: ["*"],
        additionalHeaders: ["X-Requested-With"],
      },
    },
  },
  {
    method: "POST",
    path: "/auth/login",
    handler: authController.login,
    options: {
      validate: {
        payload: userSchemas.login,
        failAction: (request, h, err) => {
          const error = Boom.badRequest("Validasi gagal");
          error.output.payload.errors = formatValidationError(err);
          throw error;
        },
      },
      response: {
        schema: Joi.object({
          status: Joi.string().valid("success").required(),
          data: Joi.object({
            token: Joi.string().required(),
            user: userSchemas.baseUser,
          }),
        }),
      },
      cors: {
        origin: ["*"],
        additionalHeaders: ["X-Requested-With"],
      },
    },
  },
];
