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

    const tokenBase64URL = Buffer.from(token)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

    const subject = "Recupero de contraseña";
    const url = `${process.env.FRONTEND_URL}/reset-password/${tokenBase64URL}`;
    const html = `<div style="margin: 0; padding: 0; box-sizing: border-box; height: 100vh;">
                    <h1 style="text-align: center; margin: auto; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', Segoe UI Symbol, 'Noto Color Emoji'; font-weight: 800; font-size: 4.75rem; color: #191919;">I-RUNNER</h1>
                    <a href="${url}" style="display: block; margin: auto; text-decoration: none;">
                      <button style="display: block; margin: auto;background-color: black; color: white; font-weight: 700; padding: 10px 30px 7px; border: none; box-shadow: 0 0 15px -5px white; cursor: pointer;">BLANQUEAR CONTRASEÑA</button>
                    </a>
                  </div>`;

    sendMailByNodemailer(email, subject, html);

    res.json({ userFound, token });
  } catch (err) {
    console.log(err);
  }
};
