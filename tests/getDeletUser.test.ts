import request from "supertest";
import server from "../src/index";

describe("GET /api/users/:id - getting a remote user", () => {
  it("404 is expected when trying to get a remote user", async () => {
    const user = await request(server)
      .post("/api/users")
      .send({
        username: "test",
        age: 20,
        hobbies: ["test"],
      });

    const userId = user.body.id;

    await request(server).delete(`/api/users/${userId}`);

    const response = await request(server).get(`/api/users/${userId}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "User not found" });
  });

  afterAll(() => {
    server.close();
  });
});
