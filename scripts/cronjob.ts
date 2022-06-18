import { CronJob } from 'cron';
import { processPublishedNotification } from './job.published-notification.script';

const job = new CronJob('*/1 * * * *', (async () => {
  await processPublishedNotification();
}), null, true, 'Africa/Lagos');

job.start();

