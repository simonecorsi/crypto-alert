"use strict";
process.env.NODE_ENV = process.env.NODE_ENV || "development";
require("./util/graceful");

const path = require("path");
const Piscina = require("piscina");
const Cron = require("node-cron");
const config = require("./config");
const logger = require("./util/logger");

for (const { ticker, pair } of config.PRICE_PAIRS) {
  for (const { interval, cron } of config.SCHEDULES) {
    const [span, unit] = interval;
    const worker = new Piscina({
      filename: path.resolve(__dirname, "worker.js"),
    });

    logger.info(`Cron: ${ticker}/${pair} at ${cron}`);
    Cron.schedule(cron, () => {
      logger.info(`Running: ${ticker}/${pair} at ${cron}`);
      worker
        .run({ ticker, pair, span, unit })
        .catch((error) => logger.error(error));
    });
  }
}
