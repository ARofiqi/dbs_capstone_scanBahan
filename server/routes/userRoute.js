"use strict";

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const { checkRole, roles } = require("../middleware/role");

module.exports = [
  {
    method: "GET",
    path: "/users",
    handler: userController.getAllUsers,
    options: {
      pre: [{ method: authMiddleware }, { method: checkRole([roles.ADMIN]) }],
      cors: {
        origin: ["*"],
        additionalHeaders: ["X-Requested-With"],
      },
    },
  },
  {
    method: "PUT",
    path: "/users/{id}",
    handler: userController.updateUser,
    options: {
      pre: [{ method: authMiddleware }, { method: checkRole([roles.USER]) }],
      cors: {
        origin: ["*"],
        additionalHeaders: ["X-Requested-With"],
      },
      payload: {
        output: "stream",
        parse: true,
        multipart: true,
        allow: "multipart/form-data",
        maxBytes: 10 * 1024 * 1024,
      },
    },
  },
  {
    method: "DELETE",
    path: "/users/{id}",
    handler: userController.deleteUser,
    options: {
      pre: [{ method: authMiddleware }, { method: checkRole([roles.USER]) }],
      cors: {
        origin: ["*"],
        additionalHeaders: ["X-Requested-With"],
      },
    },
  },
];
