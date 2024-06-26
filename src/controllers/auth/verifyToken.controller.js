import logModel from "../../models/log.model.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET = process.env.SECRET;

export const verifyToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Token undefined." });

    jwt.verify(token, SECRET, async (err, decoded) => {
      if (err) return res.status(400).json({ message: "Token not authorized" });
      const userFound = await logModel
        .findById(decoded.id)
        .populate("trainingPlan")
        .populate("workouts");

      if (!userFound)
        return res.status(400).json({ message: "Error on the token" });

      res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        role: userFound.role,
        trainingPlan: userFound.trainingPlan,
        workouts: userFound.workouts,
      });
    });
  } catch (err) {
    return res.status(500).json({ message: "Token not authorized" });
  }
};
