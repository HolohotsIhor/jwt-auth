import 'dotenv/config';
import nodemailer from 'nodemailer';

class MailService {

    constructor() {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });
    }

    async sendActivationEmail(to, link) {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: `Account activation on ${process.env.API_URL}`,
        text: ``,
        html: `
          <div>
            <h1>Account activation on ${process.env.API_URL}</h1>
            <p>Click on the link below to activate your account:</p>
            <a href="${link}">${link}</a>
          </div>            
        `
      });
    }
}

export const mailService = new MailService();
