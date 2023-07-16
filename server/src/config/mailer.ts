import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_HOST),
  auth: {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASSWORD,
  },
});
