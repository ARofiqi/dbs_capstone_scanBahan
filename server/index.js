"use strict";

const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const config = require("./config/default");
const path = require("path");
// const fs = require("fs");

const init = async () => {
  const server = Hapi.server({
    port: config.port,
    host: "localhost",
  });
  // tls: process.env.NODE_ENV === 'production' ? {
  //   key: fs.readFileSync("/home/ec2-user/ssl/key.pem"),
  //   cert: fs.readFileSync("/home/ec2-user/ssl/cert.pem"),
  // } : null,

  await server.register(require("@hapi/inert"));

  server.route(routes);
  server.route({
    method: "GET",
    path: "/uploads/{param*}",
    handler: {
      directory: {
        path: path.join(__dirname, "../uploads"),
      },
    },
  });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
