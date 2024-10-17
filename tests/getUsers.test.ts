import request from "supertest";
import server from "../src/index";

describe("GET /api/users", () => {
  it("an empty array is expected", async () => {
    const response = await request(server).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
  afterAll(() => {
    server.close();
  });
});
