import { Router } from "express";

import { auth } from "../middlewares/token.validate.js";
import { updateUser } from "../controllers/logs/updateUser.contoller.js";
import { getUsers } from "../controllers/logs/getUsers.controller.js";
import { getUserById } from "../controllers/logs/getUserById.controller.js";
import { addPlan } from "../controllers/admin/addPlan.controller.js";
import { updateTraining } from "../controllers/admin/updateTrainingByDate.controller.js";
import { deleteTrainingFromPlan } from "../controllers/admin/deleteTrainingFromPlan.controller.js";
import { getAllPlans } from "../controllers/admin/getAllPlans.controller.js";
import { getTrainingById } from "../controllers/admin/getTrainingById.controller.js";
import { addTrainingToPlan } from "../controllers/admin/addTrainingToPlan.controller.js";
import { deletePlan } from "../controllers/admin/deletePlan.controller.js";

const router = Router();

// User routes
router.post("/users", auth, getUsers);
router.post("/user/:id", auth, getUserById);
router.put("/user/:id", auth, updateUser);

// Training routes
router.post("/plans", auth, getAllPlans);
router.get("/plan/:idPlan/training/:idTraining", auth, getTrainingById);
router.post("/plan", auth, addPlan);
router.post("/plan/:idPlan", auth, addTrainingToPlan);
router.put("/plan/:idPlan/training/:idTraining", auth, updateTraining);
router.delete(
  "/plan/:idPlan/training/:idTraining",
  auth,
  deleteTrainingFromPlan
);
router.delete("/plan/:idPlan", auth, deletePlan);

export default router;
