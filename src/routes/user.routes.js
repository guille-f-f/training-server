import { Router } from "express";
import { auth } from "../middlewares/token.validate.js";
import { getPlanById } from "../controllers/user/getPlanByLevel.controller.js";

const router = Router();

router.get("/getPlan/:id", auth, getPlanById);

export default router;
