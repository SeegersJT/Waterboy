// src/cron/jobs/cleanupLogs.job.ts
import { CronJobModel } from '../../models/CronJob.model';

export const cleanupLogs = async (jobId: string) => {
  try {
    await CronJobModel.findByIdAndUpdate(jobId, { isRunning: true, lastStart: new Date(), lastError: null });

    // Your log cleanup logic here...
    console.log('[CRON JOB] Cleaning up logs...');

    // Simulate async cleanup, e.g.:
    // await deleteOldLogs();

    await CronJobModel.findByIdAndUpdate(jobId, { isRunning: false, lastEnd: new Date() });
  } catch (error: any) {
    await CronJobModel.findByIdAndUpdate(jobId, { isRunning: false, lastEnd: new Date(), lastError: error.message });
    console.error(`[CRON JOB ERROR] cleanupLogs: ${error.message}`);
  }
};
