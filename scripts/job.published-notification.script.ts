import Sugar from 'sugar';
import Property from '../models/property.model';
import mongoose, { ObjectId } from 'mongoose';
import MailgunService, { config, SendInterface } from '../services/mailgun.service';
const mongoDB = 'mongodb://127.0.0.1/clooper';
mongoose.connect(mongoDB);

const mailgun = new MailgunService(config);

export const processPublishedNotification = async () => {
  const twentyMinutesAgo = Sugar.Date.addMinutes(new Date(Date.now()), -20);

  const dataset = await Property.where('is_published').equals(true)
                                .where('notification').equals('PENDING')
                                .where('updated_at').lte(new Date(twentyMinutesAgo).getTime());

  const datasetIds = dataset.map((data: { _id?: ObjectId; }) => (data._id));
  const propertyNames = dataset.map((data: { name: string }) => (data.name));
  const updateDatasetNotification = await Property.updateMany({ _id: { $in: datasetIds } }, { notification: 'SENT' });
  const matchedCount = updateDatasetNotification.matchedCount;

  const sendMailParameters: SendInterface = {
    to: 'metrics@clooper.com',
    subject: 'Published property notification',
    text: 'Published notification',
    html: mailbody(matchedCount, propertyNames),
  }
  if (matchedCount) {
    await mailgun.send(sendMailParameters);
    console.log('Published notification sent successfully');
    return;
  }
  console.log('No published notification sent');
}

processPublishedNotification();



const mailbody = (matchedCount: number, propertyNames: string[]) => {
  let body = '';
  let names = ''
  propertyNames.forEach((name) => {
    names += `<li>${name}</li>`
  });
  body += `
    <html>
      <head>
        <title>Published Property Notification</title>
      </head>
      <body>
        <h3>Latest published property</h3>
        <p>${matchedCount} property newly published</p>
        <ul>
          Property Names:
          ${names}
        </ul>
        <p>Total Count: ${matchedCount}</p>
        <P styles='margin-top: 30px'>By: Moses Idowu</P>
      </body>
    </html>
  `
  return body;
}

                          