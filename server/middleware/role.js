const Boom = require("@hapi/boom");

const roles = {
  USER: "USER",
  ADMIN: "ADMIN",
};

const checkRole = (allowedRoles) => {
  return (request, h) => {
    const userRole = request.auth.credentials.role;

    if (!allowedRoles.includes(userRole)) {
      throw Boom.forbidden("Anda tidak memiliki akses ke resource ini");
    }

    return h.continue;
  };
};

module.exports = {
  roles,
  checkRole,
};
