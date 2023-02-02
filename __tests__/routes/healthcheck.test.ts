import server from "../../src/server";
import request from "supertest";

afterEach(done => {
  server.close();
  done();
});

describe("routes/healthcheck", () => {
  it("should be healthy", async () => {
    const response = await request(server).get("/healthy");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(response.body.status).toEqual("healthy");
  });
});
