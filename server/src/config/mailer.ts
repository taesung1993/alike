import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_HOST),
  auth: {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASSWORD,
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".hbs",
      layoutsDir: path.join(__dirname, "../static/views"),
      defaultLayout: false,
      partialsDir: path.join(__dirname, "../static/views"),
    },
    viewPath: path.join(__dirname, "../static/views"),
    extName: ".hbs",
  })
);
