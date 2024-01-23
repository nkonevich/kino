var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  port: 465,
  // host: "smtp.gmail.com",
  host: "smtp.mail.yahoo.com",
    auth: {
      user: 'nkonevich@yahoo.com',
      pass: '123Roka@$342'
    },
  secure: true,
});

module.exports = { transporter }
