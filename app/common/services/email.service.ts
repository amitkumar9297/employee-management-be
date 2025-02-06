import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import createHttpError from "http-errors";
import { loadConfig } from "../helper/config.helper";

loadConfig();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendEmail = async (mailOptions: Mail.Options): Promise<any> => {
  try {
     const res=await transporter.sendMail(mailOptions);
     return res;
  } catch (error: any) {
    createHttpError(500, { message: error.message });
  }
};