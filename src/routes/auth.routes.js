import { Router } from "express";
import { register } from "../controllers/auth/register.controller.js";
import { login } from "../controllers/auth/login.controller.js";
import { logout } from "../controllers/auth/logout.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { verifyToken } from "../controllers/auth/verifyToken.controller.js";
import { deleteLog } from "../controllers/auth/deleteLog.controller.js";

const router = Router();

// Router session
router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/logout", logout);
router.delete("/log/:id", deleteLog);

// Router verify token
router.get("/auth/verify", verifyToken);

export default router;
