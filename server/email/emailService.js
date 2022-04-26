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
  subject: 'Snowfall Alert',
  text: 'Freshly snow today fell in the villages of: Please pay attention as it may be dangerous. This message was generated automatically. If necessary, please contact our Snowcore team.'
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
