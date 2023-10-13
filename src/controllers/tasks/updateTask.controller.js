import Task from "../../models/tasks.models.js";

export const updateTask = async (req, res) => {
  try {
    const taskFound = await Task.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    ).populate("log");
    if (!taskFound) return res.status(400).json({ message: "Task not found." });
    res.json({ message: "Task update seccesfully", taskFound });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
