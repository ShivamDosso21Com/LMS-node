const nodemailer = require('nodemailer');

const Username = `${process.env.USER_NAME}` 
const Userpassword = `${process.env.PASSWORD}` 
const host = `${process.env.HOST}`
const service = `${process.env.SERIVCE}`
const port = `${process.env.Port}`

// Create a transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
  service: service, // This is the Gmail service
  host: host,
  port: port, // Port for secure SMTP (SSL)
  secure: true, // Use SSL
  auth: {
    user:Username,
    pass:Userpassword // Use environment variable or some secure way to store passwords
  }
});


