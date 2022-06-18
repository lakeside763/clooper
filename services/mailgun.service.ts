import mailgun from 'mailgun-js';

const MAILGUN_API_KEY= '6d5f58d45a60bfa69aaf1a0fbffffef6-7cd1ac2b-87b2c5d7'
const MAILGUN_DOMAIN= 'sandboxef30ef9a7ac644f0ba906505b4a45a9e.mailgun.org'

export const config = {
  apiKey: MAILGUN_API_KEY,
  domain: MAILGUN_DOMAIN
}

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