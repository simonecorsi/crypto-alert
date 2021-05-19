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
  },
};

const spans = [
  {
    name: "difference",
    schedule: "00 */15 * * * *",
    span: 15,
    unit: "m",
  },
  {
    name: "difference",
    schedule: "00 00 */1 * * *",
    span: 1,
    unit: "h",
  },
  {
    name: "difference",
    schedule: "00 00 */4 * * *",
    span: 4,
    unit: "h",
  },
  {
    name: "difference",
    schedule: "00 00 */24 * * *",
    span: 24,
    unit: "h",
  },
];

const tokens =
  process.env.NODE_ENV === "production"
    ? [
        {
          id: "bitcoin",
          ticker: "BTC",
          pair: "USDT",
          jobs: spans,
        },
        {
          id: "ethereum",
          ticker: "ETH",
          pair: "USDT",
          jobs: spans,
        },
        {
          id: "cardano",
          ticker: "ADA",
          pair: "USDT",
          jobs: spans,
        },
        {
          id: "Dogecoin",
          ticker: "DOGE",
          pair: "USDT",
          jobs: spans,
        },
        {
          id: "Shiba",
          ticker: "SHIB",
          pair: "USDT",
          jobs: spans,
        },
      ]
    : [
        {
          id: "bitcoin",
          ticker: "BTC",
          pair: "USDT",
          jobs: [
            {
              name: "difference",
              schedule: "00 */1 * * * *",
              span: 1,
              unit: "m",
            },
          ],
        },
      ];

module.exports = {
  ...envSchema({ schema }),
  tokens,
};
