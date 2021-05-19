"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const config = require("./config"); // must be first

const CronJob = require("cron").CronJob;
const Routines = require("require-dir")("./jobs");
const Crons = new Set();
const log = require("./util/logger");

for (const token of config.tokens) {
  for (const jobData of token.jobs) {
    if (!(jobData.name in Routines)) continue;
    log.info(
      `starting ${jobData.name} for pair ${token.ticker}/${token.pair} with schedule ${jobData.schedule}`
    );
    const cron = new CronJob({
      cronTime: jobData.schedule || "00 */5 * * * *",
      start: true,
      runOnInit: process.env.NODE_ENV !== "production",
      onTick: () => {
        try {
          Routines[jobData.name](token, jobData);
        } catch (e) {
          log.error(e?.response?.body || e);
        }
      },
    });
    Crons.add(cron);
  }
}

if (process.env.NODE_ENV === "production") {
  for (const sig of [
    "SIGINT",
    "SIGTERM",
    "uncaughtException",
    "unhandledRejection",
  ]) {
    process.once(sig, () => {
      const code = sig.match("^SIG") ? 0 : 1;
      log.warn(`[${sig}] exiting with code ${code}`);
      setTimeout(() => {
        process.exit(code);
      }, 2000).unref();
    });
  }
}
