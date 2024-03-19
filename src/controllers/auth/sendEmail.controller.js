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
    const html = 
    `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <!-- <link rel="stylesheet" href="./style.css" /> -->
          <style>
            * {
              padding: 0;
              margin: 0;
              box-sizing: border-box;
            }

            .bkL .a98, .bkL .IU, .qp .a98, .qp .IU {
              background: #191919 !important;
            }
      
            #irunner__container {
              padding-top: 100px;
              background: #191919;
              background-position: center;
              background-size: cover;
              height: 100vh;
            }
      
            #irunner__container h1 {
              text-align: center;
              font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
                Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
                "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol,
                "Noto Color Emoji";
              font-weight: 800;
              font-size: 4.75rem;
              color: white;
            }

            #irunner__container a {
              text-decoration: none;
            }
      
            #irunner__container button {
              display: block;
              margin: 5px auto;
              background-color: black;
              color: white;
              font-weight: 700;
              padding: 10px 30px 7px;
              border: none;
              box-shadow: 0 0 15px -5px white;
            }
          </style>
        </head>
        <body>
          <div id="irunner__container">
            <h1>I-RUNNER</h1>
            <a href="${url}">
              <button>BLANQUEAR CONTRASEÑA</button>
            </a>
          </div>
        </body>
      </html>`;

    sendMailByNodemailer(email, subject, html);

    res.json({ userFound, token });
  } catch (err) {
    console.log(err);
  }
};
