const mockDocument = {
  get: jest.fn(),
  set: jest.fn(),
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

import { addDbTask, getDbTasks } from "./taskService";

describe("addDbTask", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("add task if not exist", async () => {
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
  test("display error if task already exists", async () => {
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

  test("display error if task fields empty", async () => {
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
  test("return error if not tasks found", async () => {
    mockCollection.get.mockResolvedValueOnce({
      empty: true,
    });
    const result = await getDbTasks();
    expect(result).toEqual(false);
  });
});
