import express from "express";
import { addTask } from "../../controller/taskController/taskController";

const taskRouter = express.Router();

taskRouter.post("/tasks", addTask);

export default taskRouter;
