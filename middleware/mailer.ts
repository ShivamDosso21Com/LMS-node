import nodemailer from 'nodemailer';
import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
  region: 'us-east-1', // Replace with your SES region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Create a Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  SES: new AWS.SES({ apiVersion: '2010-12-01' }),
});

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export const sendMail = async (options: MailOptions) => {
  try {
    const info = await transporter.sendMail(options);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
