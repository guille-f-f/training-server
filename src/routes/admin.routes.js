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
import { updatePlan } from "../controllers/admin/updatePlan.controller.js";
import { adminValidate } from "../middlewares/admin.validate.js";
import { updateTrainingVisibility } from "../controllers/admin/updateTrainingVisibility.js";

const router = Router();

// User routes
router.get("/users", adminValidate, getUsers);
router.get("/user/:id", auth, getUserById);
router.put("/user/:id", adminValidate, updateUser);

// Training routes
router.get("/plans", adminValidate, getAllPlans);
router.get("/plan/:idPlan/training/:idTraining", auth, getTrainingById);
router.post("/plan", adminValidate, addPlan);
router.post("/plan/:idPlan", adminValidate, addTrainingToPlan);
router.put("/plan/:idPlan", adminValidate, updatePlan);
router.put("/plan/:idPlan/training/:idTraining", adminValidate, updateTraining);
router.put("/plan/:idPlan/training-visibility/:idTraining", adminValidate, updateTrainingVisibility);
router.delete(
  "/plan/:idPlan/training/:idTraining",
  adminValidate,
  deleteTrainingFromPlan
);
router.delete("/plan/:idPlan", adminValidate, deletePlan);

export default router;
