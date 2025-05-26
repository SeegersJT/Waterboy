import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import RequestLog from '../models/RequestLog.model';
import onFinished from 'on-finished';
import { v4 as uuid } from 'uuid';

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const requestId = uuid();
  req.headers['x-request-id'] = requestId;

  onFinished(res, async () => {
    const duration = Date.now() - start;

    const logData = {
      timestamp: new Date(),
      method: req.method,
      route: req.originalUrl,
      statusCode: res.statusCode,
      requestBody: req.body,
      responseBody: res.locals.payload || {},
    };

    // MongoDB logging
    await RequestLog.create(logData);

    // File logging
    const logDir = process.env.LOG_DIR || 'logs';
    const logFile = path.join(logDir, `${new Date().toISOString().split('T')[0]}.log`);
    const logEntry = `[${logData.timestamp.toISOString()}] ${req.method} ${
      req.originalUrl
    } ${res.statusCode} (${duration}ms)\nRequest: ${JSON.stringify(
      req.body
    )}\nResponse: ${JSON.stringify(res.locals.payload || {})}\n\n`;

    fs.mkdirSync(logDir, { recursive: true });
    fs.appendFileSync(logFile, logEntry);
  });

  next();
};
