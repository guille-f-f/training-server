import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "../routes/auth.routes.js";
import taskRoutes from "../routes/tasks.routes.js";
import adminRoutes from "../routes/admin.routes.js";
import userRoutes from "../routes/user.routes.js";

const server = express();

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // para poder establecer las cookiesñ
  })
);
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());

server.use("/api", authRoutes);
server.use("/api", taskRoutes);
server.use("/api", adminRoutes);
server.use("/api", userRoutes);

export default server;
