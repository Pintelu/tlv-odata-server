//init log
const config = require("../config/config");
const log4js = require("log4js");

//file or console
function init(type = "file") {
  log4js.configure({
    appenders: {
      file: { type: "file", filename: config.logFilePath },
      console: { type: "console" },
    },
    categories: {
      file: { appenders: ["file"], level: "error" },
      console: { appenders: ["console"], level: "debug" },
      default: { appenders: ["file", "console"], level: "debug" },
    },
  });
  return log4js.getLogger(type);
}
module.exports.init = init;
