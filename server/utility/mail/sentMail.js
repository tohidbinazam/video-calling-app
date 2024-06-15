import nodemailer from 'nodemailer';

const sentMail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.HOST_EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"V-Tex IT Ltd" <${process.env.HOST_EMAIL}>`,
    to,
    subject,
    html,
  });
};

export default sentMail;
