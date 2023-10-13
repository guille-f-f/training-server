import Task from "../../models/tasks.models.js";

export const deleteTask = async (req, res) => {
  try {
    const taskFound = await Task.findByIdAndDelete(req.params.id);
    if (!taskFound) return res.status(400).json({ message: "Task not found." });
    res.json({ message: "Task eliminated." });
  } catch (error) {
    0;
    res.status(500).json({ message: error });
  }
};
