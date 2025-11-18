import request from "supertest";
import app from "../../server";
import * as taskService from "../../services/taskService/taskService";

describe("addTask", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("return error if id is empty", async () => {
    jest.spyOn(taskService, "addDbTask").mockResolvedValueOnce(true);
    const response = await request(app).post("/tasks").send({
      id: "2",
      name: "Test task",
      description: "Complete the assignment before deadline.",
      status: "soe",
      priority: "Hig",
      deadline: "20-11-2025",
    });
    expect(response.text).toEqual("true");
  });

  test("return error if id is empty", async () => {
    jest
      .spyOn(taskService, "addDbTask")
      .mockRejectedValueOnce(new Error("Internal Server Error."));
    const response = await request(app).post("/tasks").send({
      id: "2",
      name: "Test task",
      description: "Complete the assignment before deadline.",
      status: "soe",
      priority: "Hig",
      deadline: "20-11-2025",
    });
    expect(response.text).toEqual("Internal Server Error.");
  });
  test("return error if id is empty", async () => {
    jest.spyOn(taskService, "addDbTask").mockResolvedValueOnce(false);
    const response = await request(app).post("/tasks").send({
      id: "",
      name: "",
      description: "Complete the assignment before deadline.",
      status: "pending",
      priority: "High",
      deadline: "20-11-2025",
    });
    expect(response.text).toEqual("Id doesn't exist");
  });

  test("return error if id is empty", async () => {
    jest.spyOn(taskService, "addDbTask").mockResolvedValueOnce(false);
    const response = await request(app).post("/tasks").send({
      id: "34",
      name: "",
      description: "Complete the assignment before deadline.",
      status: "pending",
      priority: "High",
      deadline: "20-11-2025",
    });
    expect(response.text).toEqual("Please fill all the fields");
  });

  test("return error if id is empty", async () => {
    jest.spyOn(taskService, "addDbTask").mockResolvedValueOnce(false);
    const response = await request(app).post("/tasks").send({
      id: "1",
      name: "Test task",
      description: "Complete the assignment before deadline.",
      status: "pending",
      priority: "High",
      deadline: "20-11-2025",
    });
    expect(response.text).toEqual("Task already exist.");
  });
});

describe("getTasks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("return error if tasks empty", async () => {
    jest.spyOn(taskService, "getDbTasks").mockResolvedValueOnce(false);
    const response = await request(app).get("/tasks");
    expect(response.text).toEqual("No tasks found");
  });
  test("return all tasks if not empty", async () => {
    jest.spyOn(taskService, "getDbTasks").mockResolvedValueOnce([
      {
        id: "2",
        name: "Test task",
        description: "Complete the assignment before deadline.",
        status: "soe",
        priority: "Hig",
        deadline: "20-11-2025",
      },
    ]);
    const response = await request(app).get("/tasks");
    expect(response.text).toEqual(
      '[{"id":"2","name":"Test task","description":"Complete the assignment before deadline.","status":"soe","priority":"Hig","deadline":"20-11-2025"}]'
    );
  });
  test("return all tasks if not empty", async () => {
    jest
      .spyOn(taskService, "getDbTasks")
      .mockRejectedValueOnce(new Error("Internal Server Error."));
    const response = await request(app).get("/tasks");
    expect(response.text).toEqual("Internal Server Error.");
  });
});

describe("updateTask", () => {
  test("return true if task updated", async () => {
    jest.spyOn(taskService, "updateDbTask").mockResolvedValueOnce(true);
    const response = await request(app).patch("/tasks").send({
      id: "2",
      status: "InProgress",
    });
    expect(response.text).toEqual("true");
  });

  test("return true if task updated", async () => {
    jest.spyOn(taskService, "updateDbTask").mockResolvedValueOnce(false);
    const response = await request(app).patch("/tasks").send({
      id: "2",
      status: "InProgress",
    });
    expect(response.text).toEqual("Task not found");
  });

  test("return true if task updated", async () => {
    jest.spyOn(taskService, "updateDbTask").mockResolvedValueOnce(false);
    const response = await request(app).patch("/tasks").send({
      status: "InProgress",
    });
    expect(response.text).toEqual("Id doesn't exist");
  });

  test("return true if task updated", async () => {
    jest
      .spyOn(taskService, "updateDbTask")
      .mockRejectedValueOnce(new Error("Internal Server Error."));
    const response = await request(app).patch("/tasks").send();
    expect(response.text).toEqual("Internal Server Error.");
  });
});

describe("deleteTask", () => {
  test("return error if id doesn't exist", async () => {
    jest.spyOn(taskService, "deleteDbTask").mockResolvedValueOnce(false);
    const response = await request(app).delete("/tasks/10");
    expect(response.text).toEqual("Task doesn't exist");
  });

  test("return error if id doesn't exist", async () => {
    jest.spyOn(taskService, "deleteDbTask").mockResolvedValueOnce(true);
    const response = await request(app).delete("/tasks/1");
    expect(response.text).toEqual("true");
  });
});
