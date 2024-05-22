import { Router } from "express";
import { auth } from "../middlewares/token.validate.js";
import { register } from "../controllers/auth/register.controller.js";
import { login } from "../controllers/auth/login.controller.js";
import { logout } from "../controllers/auth/logout.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { sendEmail } from "../controllers/auth/sendEmail.controller.js";
import { resetPassword } from "../controllers/auth/resetPassword.controller.js";
import { deleteLog } from "../controllers/auth/deleteLog.controller.js";
import { verifyToken } from "../controllers/auth/verifyToken.controller.js";
import { adminValidate } from "../middlewares/admin.validate.js";


const router = Router();

// Router session
router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/logout", logout);
router.delete("/log/:id", adminValidate, deleteLog);
// Router forgot password
router.post("/send-email", sendEmail)
router.post("/reset-password", auth, resetPassword)

// Router verify token
router.post("/auth/verify", verifyToken);

export default router;
