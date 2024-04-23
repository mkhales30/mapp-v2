const { Resend } = require('resend');

const resend = new Resend('re_G3pCqaVd_Nw3e8zrNM22XzXMkufTcHMTi');

export const sendEmail = async (recipients, subject, body) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'tsm_tin@yahoo.com',
      to: recipients,
      subject: subject,
      html: `<h3>${subject}</h3><p>${body}</p>`,
    });

    if (error) {
      console.error('Error sending email:', error);
      throw error;
    }

    console.log('Email sent successfully:', data);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};