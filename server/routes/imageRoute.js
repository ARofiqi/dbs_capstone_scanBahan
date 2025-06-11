"use strict";

const path = require("path");

module.exports = [
  {
    method: "GET",
    path: "/uploads/{param*}",
    handler: {
      directory: {
        path: path.join(__dirname, "../uploads"),
      },
    },
  },
];
