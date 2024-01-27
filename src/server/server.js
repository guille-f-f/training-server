import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

import authRoutes from "../routes/auth.routes.js";
import taskRoutes from "../routes/tasks.routes.js";
import adminRoutes from "../routes/admin.routes.js";
import userRoutes from "../routes/user.routes.js";
import workoutRoutes from "../routes/workout.routes.js"

const frontendUrl = process.env.FRONTEND_URL;
const codespaceUrl = process.env.CODESPACE_URL;

const server = express();

server.use(
  cors({
    origin: [frontendUrl, codespaceUrl],
    credentials: true, // para poder establecer las cookies
  })
);
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());

server.use("/upload", express.static("src/uploads/")) // ruta para servir documentos alojados en uploads

server.use("/api", authRoutes);
server.use("/api", taskRoutes);
server.use("/api", adminRoutes);
server.use("/api", userRoutes);
server.use("/api", workoutRoutes);

export default server;