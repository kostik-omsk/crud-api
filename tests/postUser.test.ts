import request from "supertest";
import server from "../src/startServer";

describe("POST /api/users", () => {
  it("a response containing newly created record is expected", async () => {
    const response = await request(server())
      .post("/api/users")
      .send({
        username: "test",
        age: 20,
        hobbies: ["test"],
      });

    expect(response.status).toBe(201);

    expect(response.body).toEqual({
      id: expect.any(String),
      username: "test",
      age: 20,
      hobbies: ["test"],
    });
  });

  afterAll(() => {
    server().close();
  });
});
