import { Router } from "express";
import { auth } from "../middlewares/token.validate.js";
import { getPlainById } from "../controllers/user/getPlainByLevel.controller.js";

const router = Router();

router.get("/getPlan/:id", auth, getPlainById);

export default router;
