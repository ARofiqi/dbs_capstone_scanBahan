"use strict";

const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const config = require("./config/default");

const init = async () => {
  
  const server = Hapi.server({
    port: config.port,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
        headers: ["Accept", "Content-Type"],
        additionalHeaders: ["X-Requested-With"],
      },
    },
  });
  await server.register(require("@hapi/inert"));

  server.route(routes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
