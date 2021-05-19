const got = require("got");
const log = require("./logger");
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const client = got.extend({
  prefixUrl: "https://api.binance.com/api/v3/",
  responseType: "json",
  resolveBodyOnly: true,
  headers: {
    "Accept-Type": "application/json",
  },
});

const Api = {
  client,

  async difference(ticker = "btc", pair = "usd", interval = 15, unit = "m") {
    try {
      const from = dayjs().subtract(interval, "m");
      const query = {
        symbol: `${ticker.toUpperCase()}${pair.toUpperCase()}`,
        interval: `${interval}${unit[0]}`,
        limit: 2,
      };
      log.info(query);
      const [history, current] = await this.client.get("klines", {
        searchParams: query,
      });
      const [currentOpen, , , , cd] = current;
      const [historyClose, , , , hd] = history;
      const currentData = parseFloat(cd, 10);
      const historyData = parseFloat(hd, 10);
      const change = ((currentData - historyData) / currentData) * 100;
      return {
        id: ticker,
        data: parseFloat(change.toPrecision(2), 10),
        pair,
        previous: historyData,
        current: currentData,
        open: historyClose,
        close: currentOpen,
        from: from.toString(),
        fromNow: from.fromNow(true),
      };
    } catch (e) {
      log.error(e);
      return null;
    }
  },
};

module.exports = Api;
