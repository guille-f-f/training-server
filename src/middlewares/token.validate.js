import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET = process.env.SECRET;

export const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      return res.status(401).json({ message: "Token is not valid." });
    console.log("Authorization: ");
    jwt.verify(authorization, SECRET, (err, decoded) => {
      if (err)
        return res
          .status(401)
          .json({ message: "Token is not posible decoded." });
      req.log = decoded;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
