import express from "express";
import {
  addTask,
  getTasks,
} from "../../controller/taskController/taskController";

const taskRouter = express.Router();

taskRouter.post("/tasks", addTask);
taskRouter.get("/tasks", getTasks);

export default taskRouter;
