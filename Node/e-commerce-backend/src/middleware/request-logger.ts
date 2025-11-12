import type { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import logger from "../config/logger.ts";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const correlationId = uuidv4();
  const start = process.hrtime();

  // Attach to request for further logging
  (req as any).correlationId = correlationId;

  logger.info(
    `[start] ${req.method} ${req.originalUrl} - Correlation Id: ${correlationId}`
  );

  // Handle end of request
  res.on("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const durationMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);
    const level = res.statusCode >= 400 ? "error" : "info";
    const msg = `[END] ${req.method} ${req.originalUrl} — ${res.statusCode} (${durationMs} ms) — Correlation ID: ${correlationId}`;
    logger.log(level, msg);
  });
  // Handle runtime errors gracefully
  res.on("error", (err) => {
    logger.error(
      `[ERROR] ${req.method} ${req.originalUrl} — Correlation ID: ${correlationId} — ${err.message}`
    );
  });

  next();
}
