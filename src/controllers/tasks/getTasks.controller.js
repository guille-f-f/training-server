import Task from "../../models/tasks.models.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ log: req.log.id }).populate("log");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error on server.", error });
  }
};
