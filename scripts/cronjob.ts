import { CronJob } from 'cron';
import { processPublishedNotification } from './job.published-notification.script';

const job = new CronJob('*/20 * * * *', (async () => {
  await processPublishedNotification();
}), null, true, 'Africa/Lagos');

job.start();

