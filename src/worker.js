const binance = require("./util/binance");
const notify = require("./util/notify");
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
const logger = require("./util/logger");
dayjs.extend(relativeTime);

module.exports = async ({ ticker, pair, span, unit }) => {
  logger.info(`Running job: ${ticker}/${pair} - ${span}${unit}`);

  if (typeof ticker !== "string" || typeof pair !== "string") {
    logger.warn("missing ticker/pair");
    return;
  }

  const result = await binance.difference(ticker, pair, span, unit);
  if (!result) return;

  const { data: change, fromNow, current } = result;

  if (typeof change !== "number" || change === 0) {
    logger.warn(
      `Price changed by ${change} for ${ticker}/${pair}, skipping report`
    );
    return;
  }

  let emoji = "";
  if (parseFloat(change, 10) > 0) emoji = "📈";
  if (parseFloat(change, 10) < 0) emoji = "📉";

  const message = `${emoji} *${ticker}/${pair} ${change}%*
💸 Price _${current}_
⏱  Since _${fromNow}_`;

  logger.info(message);
  notify(message);
};
