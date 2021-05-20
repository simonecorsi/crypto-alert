const logger = require("./logger");

if (process.env.NODE_ENV === "production") {
  for (const sig of [
    "SIGINT",
    "SIGTERM",
    "uncaughtException",
    "unhandledRejection",
  ]) {
    process.once(sig, () => {
      const code = sig.match("^SIG") ? 0 : 1;
      logger.warn(`[${sig}] exiting with code ${code}`);
      setTimeout(() => {
        process.exit(code);
      }, 2000).unref();
    });
  }
}
