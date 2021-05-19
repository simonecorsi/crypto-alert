const config = require("../config");
const log = require("./logger");
const got = require("got");

let tgClient;

const Notifiers = {
  console: (text) => log.info(text),
  telegram: (text) => {
    if (!tgClient) {
      tgClient = got.extend({
        prefixUrl: `https://api.telegram.org/bot${config.TG_BOT_TOKEN}`,
      });
    }
    tgClient
      .post("sendMessage", {
        searchParams: {
          chat_id: process.env.TG_CHAT_ID,
          text,
          parse_mode: "markdown",
        },
      })
      .catch((err) => log.error(err?.response?.body));
  },
};

if (!Notifiers[config.NOTIFIER]) {
  config.NOTIFIER = "console";
}

module.exports = Notifiers[config.NOTIFIER];
