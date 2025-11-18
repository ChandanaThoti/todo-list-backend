import request from "supertest";
import app from "./server";

describe("server", () => {
  test("display basic end point text", async () => {
    const response = await request(app).get("/");
    expect(response.text).toBe("This is from Todo List");
  });
});
