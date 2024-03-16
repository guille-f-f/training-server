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

    const subject = "Recupero de contraseña";
    const url = `${process.env.FRONTEND_URL}/reset-password/${token}`
    const html = `Para blanquear contraseña siga el siguiente enlace:<a href="${url}/">click aquí</a>`;

    sendMailByNodemailer(email, subject, html);

    res.json({ userFound, token });
  } catch (err) {
    console.log(err);
  }
};
