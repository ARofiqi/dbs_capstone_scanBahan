"use strict";

function formatError(message, details = null) {
  return {
    status: "error",
    message,
    details,
  };
}

module.exports = {
  formatError,
};
