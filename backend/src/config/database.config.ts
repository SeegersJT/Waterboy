import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { initializeCronJobs } from '../cron/initializeCronJobs';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('MONGO_URI is not defined in environment variables');
}

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('🗄️  | [MONGODB] Connected to Database');

    initializeCronJobs();
  } catch (error) {
    console.error('❌  | [MONGODB] Database connection error:', error);
    process.exit(1);
  }

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  | [MONGODB] Database disconnected!');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('🔄  | [MONGODB] Database reconnected');
  });
};
