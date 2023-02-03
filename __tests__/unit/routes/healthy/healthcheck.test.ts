import request from "supertest";

import testServer from "../../utils/testServer";

afterEach(done => {
  testServer.close();
  done();
});

describe("healthy endpoint", () => {
  it("should be healthy", async () => {
    const response = await request(testServer).get("/healthy");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(response.body.status).toEqual("healthy");
  });
});
