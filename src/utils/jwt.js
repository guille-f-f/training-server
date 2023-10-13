import jwt from "jsonwebtoken";
import { token } from "morgan";
import "dotenv/config";

const SECRET = process.env.SECRET;

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET, {expiresIn: "1h"}, (err, token) => {
      if(err) reject(err)
      resolve(token)
    })
  })
} 