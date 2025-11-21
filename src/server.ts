import express, { Request, Response } from "express";
import dotenv from "dotenv";
import taskRouter from "./routes/taskRoute/taskRoute";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT!);

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("This is from Todo List");
});

app.use("/", taskRouter);
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running");
});

export default app;
