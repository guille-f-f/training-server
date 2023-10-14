import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET = process.env.SECRET;

export const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(token)
    
    if (!token) return res.status(401).json({ message: "Token is not valid." });
    
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Token is not valid." });
      req.log = decoded;
      next();
    });
    
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
