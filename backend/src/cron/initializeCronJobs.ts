// src/cron/initializeCronJobs.ts
import cron from 'node-cron';
import path from 'path';
import fs from 'fs';
import { CronJobModel, ICronJob } from '../models/CronJob.model';

// Dynamically import job function from job file by type
const loadJobFunction = (jobType: string): ((jobId: string) => Promise<void>) | null => {
  const jobPath = path.resolve(__dirname, 'jobs', `${jobType}.job.ts`);
  if (fs.existsSync(jobPath)) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const jobModule = require(jobPath);
    return jobModule[jobType];
  }
  return null;
};

export const initializeCronJobs = async (): Promise<number> => {
  const cronJobs = await CronJobModel.find({ isActive: true });

  if (!cronJobs.length) {
    console.log('⚠️  | [CRONJOB] No active cron jobs found in database. Skipping initialization.');
    return 0;
  }

  cronJobs.forEach((job: ICronJob) => {
    const jobFunc = loadJobFunction(job.type);
    if (!jobFunc) {
      console.warn(`⚠️  | [CRONJOB] No job file found for type: ${job.type}`);
      return;
    }

    console.log(`✅  | [CRONJOB] Scheduling job '${job.name}' ⏰ with schedule '${job.schedule}'`);

    cron.schedule(job.schedule, async () => {
      try {
        console.log(`▶️  | [CRONJOB] Starting job: '${job.name}' (ID: ${job._id})`);

        // Mark job as running and set lastStart
        job.isRunning = true;
        job.lastStart = new Date();
        await job.save();

        // Run the actual job function
        await jobFunc(job._id.toString());

        // Mark job finished successfully
        job.lastEnd = new Date();
        job.isRunning = false;
        await job.save();

        console.log(`✅ | [CRONJOB] Finished job: '${job.name}'`);
      } catch (error) {
        console.error(`❌ | [CRONJOB] Error in job '${job.name}':`, error);

        // Mark job stopped even on failure
        job.isRunning = false;
        await job.save();
      }
    });
  });

  return cronJobs.length;
};
