const mockDocument = {
  get: jest.fn(),
  set: jest.fn(),
  update: jest.fn(),
};

const mockCollection = {
  doc: jest.fn(() => mockDocument),
  get: jest.fn(),
};

jest.mock("../../config/firebaseConfig", () => ({
  db: {
    collection: jest.fn(() => mockCollection),
  },
}));

import { addDbTask, getDbTasks, updateDbTask } from "./taskService";

describe("addDbTask", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("return true to add task if not exist", async () => {
    mockDocument.get.mockResolvedValueOnce({
      exists: false,
    });
    const mockTask = {
      id: "1",
      name: "Test task",
      description: "Test description",
      status: "pending",
      priority: "high",
      deadline: "20-11-2025",
    };
    mockDocument.set.mockResolvedValueOnce("mock Response");
    const result = await addDbTask(mockTask);
    expect(result).toBe(true);
  });

  test("return if task already exists", async () => {
    mockDocument.get.mockResolvedValueOnce({
      exists: true,
      data: () => mockTask,
    });
    const mockTask = {
      id: "1",
      name: "Test task",
      description: "Test description",
      status: "pending",
      priority: "high",
      deadline: "20-11-2025",
    };
    mockDocument.set.mockResolvedValueOnce("mock Response");
    const result = await addDbTask(mockTask);
    expect(result).toBe(false);
  });

  test("return false if task fields empty", async () => {
    mockDocument.get.mockResolvedValueOnce({
      exists: false,
      data: () => mockTask,
    });
    const mockTask = {
      id: "",
      name: "Test task",
      description: "Test description",
      status: "pending",
      priority: "high",
      deadline: "20-11-2025",
    };
    mockDocument.set.mockResolvedValueOnce("mock Response");
    const result = await addDbTask(mockTask);
    expect(result).toBe(false);
  });
});

describe("getDbTasks", () => {
  test("return false if not tasks found", async () => {
    mockCollection.get.mockResolvedValueOnce({
      empty: true,
    });
    const result = await getDbTasks();
    expect(result).toEqual(false);
  });
});

describe("updateTask", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("return false if id not exists", async () => {
    mockDocument.get.mockResolvedValueOnce({
      exists: true,
    });
    const mockTask = {
      id: "1",
      name: "Test task",
      description: "Test description",
      status: "pending",
      priority: "high",
      deadline: "20-11-2025",
    };
    mockDocument.update.mockResolvedValueOnce("mock Response");
    const result = await updateDbTask(mockTask.id, mockTask);
    expect(result).toBe(false);
  });

  test("return false if task not exists", async () => {
    mockDocument.get.mockResolvedValueOnce({
      exists: false,
    });
    const mockTask = {
      id: "11",
      name: "Test task",
      description: "Test description",
      status: "pending",
      priority: "high",
      deadline: "20-11-2025",
    };
    mockDocument.update.mockResolvedValueOnce("mock Response");
    const result = await updateDbTask(mockTask.id, mockTask);
    expect(result).toBe(true);
  });

  test("return false if id not exists", async () => {
    mockDocument.get.mockResolvedValueOnce({
      exists: true,
    });
    const mockTask = {
      id: "",
      name: "Test task",
      description: "Test description",
      status: "pending",
      priority: "high",
      deadline: "20-11-2025",
    };
    mockDocument.update.mockResolvedValueOnce("mock Response");
    const result = await updateDbTask(mockTask.id, mockTask);
    expect(result).toBe(false);
  });
});
