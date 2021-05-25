"use strict";
process.env.NODE_ENV = process.env.NODE_ENV || "development";
require("./util/graceful");
const schedule = require("./schedule");
const logger = require("./util/logger");

try {
  schedule();
} catch (error) {
  logger.error(error);
}
