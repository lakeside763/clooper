const port = process.env.PORT;

const mailgun = {
  apiKey: process.env.MAILGUN_API_KEY || '',
  domain: process.env.MAILGUN_DOMAIN || ''
}

export default {
  port,
  mailgun
}