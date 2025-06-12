"use strict";

const prisma = require("./prismaClient");
const { hashPassword, comparePassword, generateToken } = require("../utils/authUtils");
const Boom = require("@hapi/boom");

async function registerUser({ fullname, username, email, password, photo }) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw Boom.conflict("Email sudah terdaftar");
  }
  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      fullname,
      username,
      email,
      password: hashedPassword,
      photo,
    },
  });

  return {
    id: user.id,
    fullname: user.fullname,
    username: user.username,
    role: user.role,
    email: user.email,
    photo: user.photo,
    createdAt: user.createdAt,
  };
}

async function loginUser({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw Boom.unauthorized("Email atau password salah");
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    throw Boom.unauthorized("Email atau password salah");
  }

  const token = generateToken({ id: user.id, email: user.email, username: user.username, role: user.role });

  return { token, user: { id: user.id, fullname: user.fullname, username: user.username, email: user.email, photo: user.photo, role: user.role } };
}

module.exports = {
  registerUser,
  loginUser,
};
