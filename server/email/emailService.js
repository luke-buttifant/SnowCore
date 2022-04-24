var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'snowcoreofficial@outlook.com',
    pass: 'Snowcore'
  }
});

var mailOptions = {
  from: 'SnowCoreOfficial@outlook.com, ',
  to: 'SnowCoreOfficial@outlook.com, ',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

const emailService = async () => {
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

module.exports = emailService
