import Task from "../../models/tasks.models.js";

export const createTask = async (req, res) => {
  try {
    const dataTask = req.body;
    const newTask = new Task({ ...dataTask, log: req.log.id });
    await newTask.save();
    console.log(newTask)
    res.json({ message: "Create new task.", newTask });
  } catch (error) {
    res.status(500).json({ message: "Error on server.", error });
  }
};
