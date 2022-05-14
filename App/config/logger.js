const winston = require("winston");
const fs = require("fs");
const appRoot = require("app-root-path");
const keys = require("./keys");

const { combine, label, timestamp, colorize, printf } = winston.format;

const getLogToProcess = (fileOpt, consoleOpt) => {
  const array = [];
  array.push(
    new winston.transports.File(fileOpt),
    new winston.transports.Console(consoleOpt)
  );
  return array;
};

/**
 * USed to log event in the app lifeCycle
 * @class Logger
 */

class Logger {
  constructor(options) {
    this.logDir = options.logDirPath || `${appRoot}/logs"`;
    this.label = options.label || "log";
    this._commonOptions = {
      console: {
        level: "debug",
        handleExceptions: true,
        format: combine(
          colorize({ all: true }),
          printf(
            (msg) =>
              `${msg.timestamp}: ${msg.label} ${msg.level}: ${msg.message}`
          )
        ),
      },
      file: {
        level: "debug",
        filename: `${this.logDir}/app.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 2000,
        format: winston.format.json(),
      },
    };
    this.debugMode = !!options.debugMode;
    this.env = keys.NODE_ENV || "development";
  }

  _getTransport() {
    const { console, file } = this._commonOptions;
    let level = this.debug ? "debug" : "info";
    if (this._environment === "production" && this.debugMode) level = "error";
    const consoleOpt = { ...console, level };
    const fileOpt = {
      ...file,
      filename: `${this.logDir}/app.log${this.environment}.log`,
    };
    return getLogToProcess(fileOpt, consoleOpt);
  }

  init() {
    if (!fs.existsSync(this.logDir)) fs.mkdirSync(this.logDir);
    const logger = winston.createLogger({
      format: combine(
        timestamp(),
        label({
          label: this.label,
        })
      ),
      transport: this._getTransport(),
      exitOnError: false,
    });
    logger.stream = {
      write(message) {
        logger.info(message);
      },
    };
    return logger;
  }

  static createLogger(options) {
    const loggerInstance = new Logger(options);
    return loggerInstance.init();
  }
}

module.exports = Logger;
