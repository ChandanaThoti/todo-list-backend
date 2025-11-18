import express from "express";
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../../controller/taskController/taskController";

const taskRouter = express.Router();

taskRouter.post("/tasks", addTask);
taskRouter.get("/tasks", getTasks);
taskRouter.patch("/tasks", updateTask);
taskRouter.delete("/tasks/:id", deleteTask);

export default taskRouter;
