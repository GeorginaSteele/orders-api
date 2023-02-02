import request from "supertest";
const faker = require("faker");

import server from "../../../../src/server";

afterEach(done => {
  server.close();
  done();
});

describe("OrderRouter", () => {
  it("should return the order details for a given order ID", async () => {
    const testOrderId: "string" = faker.random.uuid();
    const testEmail: "string" = faker.random.email;
    const testLineId: "string" = faker.random.uuid();

    const response = await request(server).get(`/order/${testOrderId}`);

    expect(response.status).toEqual(201);
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
});
