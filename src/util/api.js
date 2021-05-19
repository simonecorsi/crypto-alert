const got = require("got");
const log = require("./logger");
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
const getCache = require("./cache");

const client = got.extend({
  prefixUrl: "https://api.coingecko.com/api/v3/",
  responseType: "json",
  resolveBodyOnly: true,
  headers: {
    "Accept-Type": "application/json",
  },
});

const Api = {
  client,
  async current(id, pair = "usd") {
    try {
      const body = await this.client.get("simple/price", {
        searchParams: {
          ids: id,
          vs_currencies: pair,
        },
      });
      return {
        id,
        data: body?.[id]?.[pair],
        pair: pair,
        from: dayjs().toString(),
      };
    } catch (e) {
      log.error(e);
      return null;
    }
  },

  // @deprecated
  async history(id, pair = "usd", span = 1, unit = "hours") {
    const dt = dayjs().subtract(span, unit);
    const date = dt.format("DD-MM-YYYY");
    try {
      const body = await this.client.get(`coins/${id}/history`, {
        searchParams: { date },
      });

      return {
        id,
        data: body.market_data?.current_price?.[pair],
        from: date,
      };
    } catch (e) {
      log.error(e);
      return null;
    }
  },

  async difference(id, pair = "usd", span = 1, unit = "hours") {
    try {
      const Price = getCache([id, pair, span, unit].join(":"));
      const current = await this.current(id, pair);

      Price.set("current", current);

      if (!current) return null;

      // first entry for this timespan
      if (!Price.has("prev")) {
        Price.set("prev", current);
        return;
      }
      const history = Price.get("prev");

      console.log("history,current :>> ", history, current);

      const change = ((current.data - history.data) / current.data) * 100;

      Price.set("prev", current);
      return {
        id,
        data: change.toPrecision(3),
        pair,
        previous: history.data,
        current: current.data,
        from: history.from,
        fromNow: dayjs(history.from).fromNow(true),
      };
    } catch (e) {
      log.error(e);
      return null;
    }
  },
};

module.exports = Api;
