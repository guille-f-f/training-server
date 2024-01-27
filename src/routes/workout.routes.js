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

const router = Router();
const upload = multer({ dest: "src/uploads" });

// Admin routes
router.get("/workouts", auth, getAllWorkouts);
router.post("/add-workout", auth, upload.single("workoutImage"), addWorkout);
router.delete("/delete-workout/:id", auth, deleteWorkoutById);
router.put("/update-workout/:id", auth, upload.single("workoutImage"), updateWorkout);

// router.post("/workoutUpload", upload.single("workoutImage"), (req, res) => {
//   console.log(req.file);
//   console.log(saveImage)
//   saveImage(req.file)
//   res.send("Archivo subido de manera exitosa");
// });

// router.use("/workoutImage", express.static("src/uploads/"))

// User routes
router.get("/workout/:idWorkout", getWorkoutById);
router.get("/workout", getWorkout);

export default router;
