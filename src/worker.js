const binance = require("./util/binance");
const log = require("./util/logger");
const notify = require("./util/notify");
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

module.exports = async ({ ticker, pair, span, unit }) => {
  log.info(`Running difference for ${ticker}/${pair}`);

  if (typeof ticker !== "string" || typeof pair !== "string") {
    log.warn("missing ticker/pair");
    return;
  }

  const result = await binance.difference(ticker, pair, span, unit);
  if (!result) return;

  const { data: change, fromNow, current } = result;

  if (typeof change !== "number" && change === 0) return;

  let emoji = "";
  if (parseFloat(change, 10) > 0) emoji = "📈";
  if (parseFloat(change, 10) < 0) emoji = "📉";

  const message = `${emoji} *${ticker}/${pair} ${change}%*
💸 Price _${current}_
⏱  Since _${fromNow}_`;

  log.info(message);
  notify(message);
};