import express from "express";
import {
  addTask,
  getTasks,
  updateTask,
} from "../../controller/taskController/taskController";

const taskRouter = express.Router();

taskRouter.post("/tasks", addTask);
taskRouter.get("/tasks", getTasks);
taskRouter.patch("/tasks", updateTask);

export default taskRouter;
