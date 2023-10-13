import Task from "../../models/tasks.models.js";

export const getTaskById = async (req, res) => {
  try {
    const taskFound = await Task.findById(req.params.id);
    if (!taskFound) return res.status(400).json({ message: "Task not found." });
    res.json({ message: "Task found.", taskFound });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
