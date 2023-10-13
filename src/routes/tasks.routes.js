import { Router } from "express";
import { auth } from "../middlewares/token.validate.js";
import { getTasks } from "../controllers/tasks/getTasks.controller.js";
import { getTaskById } from "../controllers/tasks/getTaskById.controller.js";
import { createTask } from "../controllers/tasks/createTask.controller.js";
import { updateTask } from "../controllers/tasks/updateTask.controller.js";
import { deleteTask } from "../controllers/tasks/deleteTask.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { taskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/tasks", auth, getTasks);
router.get("/task/:id", auth, getTaskById);
router.post("/task", auth, validateSchema(taskSchema), createTask);
router.put("/task/:id", auth,  validateSchema(taskSchema), updateTask);
router.delete("/task/:id", auth, deleteTask);

export default router;
