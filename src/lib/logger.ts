import path from "node:path";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

import { serverEnv } from "#/config/server";

const productionFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

const developmentFormat = winston.format.combine(
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.colorize(),
  winston.format.printf(function (info) {
    let msg = info.timestamp + " " + info.level + ": " + info.message;
    const { level: _level, ...meta } = info;

    delete meta.timestamp;
    delete meta.message;
    delete meta.service;

    if (meta.stack) {
      msg += "\n" + meta.stack;
      delete meta.stack;
    }
    if (Object.keys(meta).length > 0) {
      msg += " " + JSON.stringify(meta);
    }
    return msg;
  }),
);

let transports: winston.transport[] = [];

transports.push(
  new winston.transports.Console({
    format: serverEnv.NODE_ENV === "production" ? productionFormat : developmentFormat,
  }),
);

if (serverEnv.NODE_ENV === "production") {
  transports.push(
    new DailyRotateFile({
      filename: path.join(serverEnv.LOG_DIR, "error-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxFiles: "30d",
      zippedArchive: true,
      format: productionFormat,
    }),
  );

  transports.push(
    new DailyRotateFile({
      filename: path.join(serverEnv.LOG_DIR, "combined-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
      zippedArchive: true,
      format: productionFormat,
    }),
  );
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  defaultMeta: { service: "bchat" },
  transports: transports,
  exitOnError: false,
});

export default logger;
