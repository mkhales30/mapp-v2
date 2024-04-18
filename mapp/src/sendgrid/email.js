const sendgridApiKey = require('./sendgrid-config');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(sendgridApiKey);

async function sendQRCodeEmail(email, studentId) {
    const msg = {
      to: email,
      from: 'mapp-spring24@outlook.com',
      subject: 'Your QR Code',
      text: `Here is your QR code for student ID ${studentId}`,
      html: `<strong>Here is your QR code for student ID ${studentId}</strong>`,
    };
  
    try {
      await sgMail.send(msg);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error.response?.body?.errors || error.message);
      throw new Error('Failed to send email');
    }
  }

function getQRCodeImage(studentId) {
  // Return the base64-encoded image data
}

module.exports = { sendQRCodeEmail };
