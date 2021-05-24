require("dotenv").config();
const envSchema = require("env-schema");

const schema = {
  type: "object",
  required: ["TG_CHAT_ID", "TG_BOT_TOKEN"],
  properties: {
    TG_CHAT_ID: {
      type: "number",
    },
    TG_BOT_TOKEN: {
      type: "string",
    },
    NOTIFIER: {
      type: "string",
      default: "console",
    },
    PRICE_PAIRS: {
      type: "string",
      default: "BTC/USDT",
    },
  },
};

const config = envSchema({ schema });

config.SCHEDULES = [
  {
    interval: [15, "m"],
    cron: "00 15-45/15 * * * *",
  },
  {
    interval: [1, "h"],
    cron: "00 00 */1 * * *",
  },
  {
    interval: [4, "h"],
    cron: "00 00 */4 * * *",
  },
  {
    interval: [24, "h"],
    cron: "00 00 9,21 * * *",
  },
];

if (process.env.NODE_ENV !== "production") {
  config.PRICE_PAIRS = "BTC/USDT";
  config.SCHEDULES = [{ interval: [1, "m"], cron: "00 */1 * * * *" }];
}

config.PRICE_PAIRS = config.PRICE_PAIRS.split(",").map((val) => {
  const [ticker, pair] = val.split("/");
  return { ticker, pair };
});

module.exports = config;
