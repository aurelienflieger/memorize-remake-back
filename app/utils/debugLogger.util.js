import debug from "debug";

function debugLogger(filename) {
  const logger = debug(`memorize-server:${filename}`);
  return logger;
}

export default debugLogger;
