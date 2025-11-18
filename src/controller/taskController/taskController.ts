import { Request, Response } from "express";
import { Task } from "../../types/Task";
import { addDbTask, getDbTasks } from "../../services/taskService/taskService";

export const addTask = async (req: Request, res: Response) => {
  try {
    const { id, name, description, status, priority, deadline } = req.body;
    if (!id) {
      return res.status(400).send("Id doesn't exist");
    }
    if (!name || !description || !status || !priority || !deadline) {
      return res.status(400).send("Please fill all the fields");
    }
    const newTask: Task = { id, name, description, status, priority, deadline };
    const task = await addDbTask(newTask);
    if (!task) {
      return res.status(404).send("Task already exist.");
    }
    return res.status(201).json(task);
  } catch {
    res.status(500).send("Internal Server Error.");
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await getDbTasks();
    if (!tasks) {
      return res.status(404).send("No tasks found");
    }
    res.status(200).json(tasks);
  } catch {
    res.status(500).send("Internal Server Error.");
  }
};
