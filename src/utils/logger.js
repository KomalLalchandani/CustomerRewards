const LOG_LEVELS = {
  DEBUG: "debug",
  INFO: "info",
  WARN: "warn",
  ERROR: "error",
};

const logger = {
  log: (level, ...args) => {
    switch (level) {
      case LOG_LEVELS.DEBUG:
        console.debug("[DEBUG]:", ...args);
        break;
      case LOG_LEVELS.INFO:
        console.info("[INFO]:", ...args);
        break;
      case LOG_LEVELS.WARN:
        console.info("[WARN]:", ...args);
        break;
      case LOG_LEVELS.ERROR:
        console.info("[ERROR]:", ...args);
        break;
      default:
        console.log(`${level}`, ...args);
    }
  },
  debug: (...args) => logger.log(LOG_LEVELS.DEBUG, ...args),
  info: (...args) => logger.log(LOG_LEVELS.INFO, ...args),
  warn: (...args) => logger.log(LOG_LEVELS.WARN, ...args),
  error: (...args) => logger.log(LOG_LEVELS.ERROR, ...args),
};

export default logger;
