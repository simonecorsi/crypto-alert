const api = require("../src/util/api");

(async () => {
  const body = await api.difference("bitcoin", "usd", 1, "day");
  console.log("body :>> ", body);
})();
