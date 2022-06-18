import Sugar from 'sugar';
import Property from '../models/property.model';
import mongoose, { ObjectId } from 'mongoose';
import MailgunService, { config, SendInterface } from '../services/mailgun.service';
const mongoDB = 'mongodb://127.0.0.1/clooper';
mongoose.connect(mongoDB);

const mailgun = new MailgunService(config);

const processPublishedNotification = async () => {
  const twentyMinutesAgo = Sugar.Date.addMinutes(new Date(Date.now()), -20);

  const dataset = await Property.where('is_published').equals(true)
                                .where('notification').equals('PENDING')
                                .where('updated_at').lte(new Date(twentyMinutesAgo).getTime());

  const datasetIds = dataset.map((data: { _id?: ObjectId; }) => (data._id));
  const propertyNames = dataset.map((data: { name: string }) => (data.name));
  const updateDatasetNotification = await Property.updateMany({ _id: { $in: datasetIds } }, { notification: 'SENT' });
  const matchedCount = updateDatasetNotification.matchedCount;

  const sendMailParameters: SendInterface = {
    to: 'lakeside763@gmail.com',
    subject: 'Published property notification',
    text: 'Published notification',
    html: mailbody(matchedCount, propertyNames),
  }
  if (matchedCount) {
    await mailgun.send(sendMailParameters);
    console.log('Published notification sent successfully');
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
        <h5>Latest published property</h5>
        <p>Count: ${matchedCount}</p>
        <ul>
          Property Names:
          ${names}
        </ul>
      </body>
    </html>
  `
  return body;
}

                          