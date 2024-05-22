// import express from "express";
import { Router } from "express";
import multer from "multer"
import saveImage from "../utils/renameImage.js"

import { auth } from "../middlewares/token.validate.js";
import { addWorkout } from "../controllers/workout/addWorkout.controller.js";
import { deleteWorkoutById } from "../controllers/workout/deleteWorkoutById.controller.js";
import { getAllWorkouts } from "../controllers/workout/getAllWorkouts.controller.js";
import { getWorkout } from "../controllers/workout/getWorkout.controller.js";
import { updateWorkout } from "../controllers/workout/updateWorkout.controller.js";
import { getWorkoutById } from "../controllers/workout/getWorkoutById.controller.js";
import { adminValidate } from "../middlewares/admin.validate.js";

const router = Router();
const upload = multer({ dest: "src/uploads" });

// Admin routes
router.get("/workouts", adminValidate, getAllWorkouts);
router.post("/add-workout", adminValidate, addWorkout);
router.delete("/delete-workout/:id", adminValidate, deleteWorkoutById);
router.put("/update-workout/:id", adminValidate, upload.single("workoutImage"), updateWorkout);

// User routes
router.get("/workout/:idWorkout", getWorkoutById);
router.get("/workout", getWorkout);

export default router;
