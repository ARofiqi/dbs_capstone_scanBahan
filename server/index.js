"use strict";

const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const config = require("./config/default");
const path = require("path");

const init = async () => {
  const server = Hapi.server({
    port: config.port,
    host: "0.0.0.0",
    tls: {
      key: fs.readFileSync("/home/ec2-user/ssl/key.pem"),
      cert: fs.readFileSync("/home/ec2-user/ssl/cert.pem"),
    },
  });

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
