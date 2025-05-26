import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from './utils/routeLoader.util';
import { connectDB } from './config/database.config';
import { loggingMiddleware } from './middleware/logging.middleware';
import { authMiddleware } from './middleware/auth.middleware';
import { responsesMiddleware } from './middleware/response.middleware';
import errorHandlingMiddleware from './middleware/errorHandling.middleware';

dotenv.config();
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Logger Middleware
app.use(loggingMiddleware);
// Authentication Middleware
app.use(authMiddleware);
// Response Middleware
app.use(responsesMiddleware);

// Routes
app.use(router);

// Error Handling Middleware
app.use(errorHandlingMiddleware);

// Connect DB and run crons
connectDB();

export default app;
