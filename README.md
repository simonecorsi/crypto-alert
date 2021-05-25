# Crypto Alert

This simple bot get data from Binance and notify of change in price.

## Get Started

```sh
git clone https://github.com/simonecorsi/crypto-alert.git
cd crypto-alert
mv .env.example .env
# Modify .env accordingly
node src/index.js
```

## Configuration

Configuration can be found in `src/config`, default scheduled checks are every 15m, 1h, 4h and 24h.

Each schedule config object has an `interval` which is the time interval to check for price change on the Binance Api and a `cron` expression that is used to schedule the worker.

### .env

| variable       | default    | description                                                           |
| -------------- | ---------- | --------------------------------------------------------------------- |
| `TG_BOT_TOKEN` |            | C1                                                                    |
| `TG_CHAT_ID`   |            | C2                                                                    |
| `NOTIFIER`     | `console`  | Can be `console` or `telegram`                                        |
| `PRICE_PAIRS`  | `BTC/USDT` | Price pair divided by comma as seen on binace, eg: `BTC/USDT,ETHUSDT` |
