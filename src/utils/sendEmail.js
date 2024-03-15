import nodemailer from "nodemailer";

import "dotenv/config";

export const sendMailByNodemailer = async (to, subject, html) => {
  try {
    console.log("estamos enviando el mail");
    const config = {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "tiendaecommerce381@gmail.com",
        pass: process.env.NODEMAILER_PASS,
      },
    };

    const message = {
      from: "tiendaecommerce381@gmail.com",
      to,
      subject,
      html,
    };

    const transport = nodemailer.createTransport(config);

    const info = await transport.sendMail(message);

    return info;
  } catch (err) {
    res.status(404).json({ message: "Error on the send mail." });
  }
};
