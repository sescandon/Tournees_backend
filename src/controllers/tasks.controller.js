import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};
export const createTask = async (req, res) => {
  const { title, description, date } = req.body;
  const newTask = new Task({
    title,
    description,
    date
  });
  const savedTask = await newTask.save();
  res.json(savedTask);
};
export const getSpecificTask = async (req, res) => {
  const foundTask = await Task.findById(req.params.id);
  if (!foundTask) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(foundTask);
};

export const deleteTask = async (req, res) => {
  const foundTask = await Task.findByIdAndDelete(req.params.id);
  if (!foundTask) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(foundTask);
};

export const updateTask = async (req, res) => {
  const foundTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!foundTask) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(foundTask);
};
