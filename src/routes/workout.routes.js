import { Router } from "express";

import { auth } from "../middlewares/token.validate.js";
import { addWorkout } from "../controllers/workout/addWorkout.controller.js";
import { deleteWorkoutById } from "../controllers/workout/deleteWorkoutById.controller.js";
import { getAllWorkouts } from "../controllers/workout/getAllWorkouts.controller.js";
import { getWorkout } from "../controllers/workout/getWorkout.controller.js";
import { updateWorkout } from "../controllers/workout/updateWorkout.controller.js";

const router = Router();

// Admin routes
router.get("/workouts", auth, getAllWorkouts);
router.post("/add-workout", auth, addWorkout);
router.delete("/delete-workout/:id", auth, deleteWorkoutById);
router.put("/update-workout/:id", auth, updateWorkout);

// User routes
router.get("/workout", getWorkout);

export default router;