const path = require("path");
const Piscina = require("piscina");
const Cron = require("node-cron");
const config = require("./config");
const logger = require("./util/logger");
const Schedules = new Set();

for (const { ticker, pair } of config.PRICE_PAIRS) {
  for (const { interval, cron } of config.SCHEDULES) {
    const [span, unit] = interval;
    const worker = new Piscina({
      filename: path.resolve(__dirname, "worker.js"),
    });

    logger.info(`Cron: ${ticker}/${pair} at ${cron}`);
    Schedules.add(() =>
      Cron.schedule(cron, () => {
        logger.info(`Running: ${ticker}/${pair} at ${cron}`);
        worker
          .run({ ticker, pair, span, unit })
          .catch((error) => logger.error(error));
      })
    );
  }
}

module.exports = () => {
  for (const run of Schedules) run();
};
