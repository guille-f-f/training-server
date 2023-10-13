import { Router } from "express";
import { auth } from "../middlewares/token.validate.js";
import { getPlainById } from "../controllers/user/getPlainByLevel.controller.js";

const router = Router();

router.get("/plan/:id", auth, getPlainById);

export default router;
