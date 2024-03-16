import LogModel from "../../models/log.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../../utils/jwt.js";
import { sendMailByNodemailer } from "../../utils/sendEmail.js";

export const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const userFound = await LogModel.findOne({ email });

    if (!userFound)
      return res.status(400).json({ message: "Error, user not found" });

    const token = await createAccessToken({ id: userFound._id });

    // const tokenBase64URL = btoa(token)
    //   .replace(/\+/g, "-")
    //   .replace(/\//g, "_")
    //   .replace(/=/g, "");

    const tokenBase64URL = Buffer.from(token)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

    const subject = "Recupero de contraseña";
    const url = `${process.env.FRONTEND_URL}/reset-password/${tokenBase64URL}`;
    const html = `Para blanquear contraseña siga el siguiente enlace:<a href="${url}/">click aquí</a>`;

    sendMailByNodemailer(email, subject, html);

    res.json({ userFound, token });
  } catch (err) {
    console.log(err);
  }
};
