// src/models/cronJob.model.ts
import { Schema, model, Document } from 'mongoose';

export interface ICronJob extends Document {
  name: string;
  type: string;
  schedule: string;
  isActive: boolean;
  lastStart?: Date;
  lastEnd?: Date;
  isRunning: boolean;
  lastError?: string;
}

const cronJobSchema = new Schema<ICronJob>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  schedule: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  lastStart: { type: Date },
  lastEnd: { type: Date },
  isRunning: { type: Boolean, default: false },
  lastError: { type: String },
});

export const CronJobModel = model<ICronJob>('CronJob', cronJobSchema);
