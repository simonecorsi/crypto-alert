# Crypto Alert

## About The Project

This project only aim is to provide myself for alert about crypto price changes since all the exchange are not up to date with notifications and sporadic.

This simple bot will pull data from binance on scheduled interval, format it and send a notification alert over telegram, for it to work you must of course need a [Telegram Bot](https://core.telegram.org/bots/api)

## Installation

You can install locally

```sh
git clone https://github.com/simonecorsi/crypto-alert.git
cd crypto-alert
mv .env.example .env
# Modify .env accordingly
```

### Run with node

```js
NODE_ENV=production node src/index.js
```

### Run with Node

```sh
NODE_ENV=production node src/
```

### Run with Docker

```sh
docker-compose up -d
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

## Contributing

Project is pretty simple and straight forward for what is my needs, but if you have any idea you're welcome.

This projects uses [commitizen](https://github.com/commitizen/cz-cli) so be sure to use standard commit format or PR won't be accepted

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat(scope): some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Simone Corsi - [@im_simonecorsi](https://twitter.com/im_simonecorsi)

## Acknowledgements

- [Binance Api](https://binance-docs.github.io/apidocs/spot/en/) - Binance free api data
