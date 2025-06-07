"use strict";

const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const config = require("./config/default");
const path = require('path'); 

const init = async () => {
  const server = Hapi.server({
    port: config.port,
    host: "localhost",
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
