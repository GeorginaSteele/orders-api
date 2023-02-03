import request from "supertest";
const faker = require("faker");
import { Model } from "sequelize-typescript";

// import testServer from "../../utils/testServer";
// import server from "../../../../src/main";
import { getOrder } from "../../../../src/data/order/getOrder";
import { OrderDetails } from "../../../../src/types";
import { Orders } from "../../../../src/database/models";
import { OrderNotFoundError } from "../../../../src/errors/OrderNotFoundError";

// afterEach((done) => {
//   server.close();
//   done();
// });

describe("getOrder", () => {
  it("should return the order details for an existing order ID", async () => {
    const testOrderId: string = faker.datatype.uuid();
    const testEmail: string = faker.random.email;
    const testLineId: string = faker.datatype.number();
    const testOrderDetails: OrderDetails = {
      id: testOrderId,
      status: "OPEN",
      email: testEmail,
      ordersItems: [
        {
          lineId: testLineId,
          quantity: 1,
          notes: ""
        }
      ]
    };

    jest.spyOn(Orders, "findOne").mockResolvedValue(({
      id: testOrderId,
      customer_id: faker.datatype.uuid(),
      status: "OPEN",
      date: faker.date.past(),
      ordersItems: [
        {
          id: testLineId,
          order_id: testOrderId,
          item_id: faker.datatype.uuid(),
          qty: 1,
          notes: faker.random.string
        }
      ],
      customers: {
        email: testEmail
      }
    } as unknown) as Model<Orders>);

    const orderResponse = await getOrder(testOrderId);

    expect(orderResponse).toEqual(testOrderDetails);
  });

  it("should throw an error if the order ID does not exist", async () => {
    const testOrderId: string = "doesnotexist";
    jest.spyOn(Orders, "findOne").mockResolvedValue(null);

    const orderResponse = getOrder(testOrderId);

    expect(orderResponse).rejects.toThrow(OrderNotFoundError);
  });
});