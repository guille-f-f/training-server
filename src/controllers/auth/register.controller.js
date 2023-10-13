import LogModel from "../../models/log.model.js";
import bcrypt from "bcryptjs";

import { createAccessToken } from "../../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const userFound = await LogModel.findOne({email});
    if(userFound) return res.status(400).json({message: "The user already exists"})

    const hasPassword = bcrypt.hashSync(password, 10);
    const newLog = new LogModel({
      username,
      email,
      password: hasPassword,
    });
    await newLog.save();
    const token = await createAccessToken({ id: newLog._id });
    res.cookie("token", token);
    res.json({
      response: "Registration complete",
      id: newLog._id,
      username: newLog.username,
      email: newLog.email,
      createAt: newLog.createdAt,
      updatedAt: newLog.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
