import request from "supertest";
import server from "../src/startServer";

describe("DELETE /api/users/:id", () => {
  it("the user is expected to be deleted", async () => {
    const user = await request(server())
      .post("/api/users")
      .send({
        username: "pidr",
        age: 20,
        hobbies: ["test"],
      });

    const response = await request(server()).delete(`/api/users/${user.body.id}`);
    expect(response.status).toBe(204);
  });

  afterAll(() => {
    server().close();
  });
});
