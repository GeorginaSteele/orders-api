import request from "supertest";
const faker = require("faker");

import testServer from "../../utils/testServer";

afterEach(done => {
  testServer.close();
  done();
});

describe("OrderRouter", () => {
  it("should return the order details for an existing order ID", async () => {
    const testOrderId: "string" = faker.random.uuid();
    const testEmail: "string" = faker.random.email;
    const testLineId: "string" = faker.random.uuid();

    const response = await request(testServer).get(`/order/${testOrderId}`);

    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(response.body).toEqual({
      id: testOrderId,
      status: "OPEN",
      email: testEmail,
      orderItems: [
        {
          lineId: testLineId,
          quantity: 1,
          notes: ""
        }
      ]
    });
  });

  it("should return a 404 if the order ID does not exist", async () => {
    const testOrderId: "string" = faker.random.uuid();
    const testEmail: "string" = faker.random.email;
    const testLineId: "string" = faker.random.uuid();

    const response = await request(testServer).get(`/order/${testOrderId}`);

    expect(response.status).toEqual(404);
  });
});
