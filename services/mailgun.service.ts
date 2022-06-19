import mailgun from 'mailgun-js';

export interface SendInterface {
  from?: string;
  to: string;
  subject: string;
  text: string;
  html: any
}

class MailgunService {
  mg: any;
  from: string;
  constructor({ apiKey, domain }: { apiKey: string, domain: string}) {
    this.mg = mailgun({ apiKey, domain })
    this.from = `Clooper Notification <noreply@${domain}>`;
  }

  async send({
    from = this.from,
    to,
    subject,
    text,
    html,
    ...rest
  }: SendInterface) {
    return new Promise((resolve, reject) => {
      this.mg.messages().send({
        from,
        to,
        subject,
        text,
        html,
        ...rest,
      }, (error: any, body: any) => {
        if (error) return reject(error);
        return resolve(body);
      });
    });
  }
}

export default MailgunService;