import jwt from "jsonwebtoken";
import logModel from "../models/log.model.js";
import "dotenv/config";

const SECRET = process.env.SECRET;

export const adminValidate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      return res.status(401).json({ message: "Token is not valid." });
    
    jwt.verify(authorization, SECRET, async (err, decoded) => {
      if (err)
        return res
          .status(401)
          .json({ message: "Token is not posible decoded." });

      req.log = decoded;

      const userFound = await logModel.findById(decoded.id) 
      
      if (userFound.role !== "ADMIN_ROLE") {
        console.log("invalid login");
        return res.status(401).json({message: "invalid login"});
      }
      
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
