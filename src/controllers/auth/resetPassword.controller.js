import LogModel from "../../models/log.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const resetPassword = async (req, res) => {
  try {
    const { password, repeatPassword } = req.body;

    if (password !== repeatPassword)
      res
        .status(401)
        .json({ message: "Error, the passwords provided do not match." });

    const userFound = await LogModel.findById(req.log.id);

    if (!userFound || userFound.email !== req.body.email)
      res.status(401).json({ message: "Error on the server." });

    const hasPassword = bcrypt.hashSync(password, 10);

    userFound.password = hasPassword;

    await userFound.save();

    res.json({ message: "Password update succesfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error on the server." });
  }
};
