import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  IsUUID,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import { CustomersModel } from "./Customers";
import { OrdersItemsModel } from "./OrdersItems";

@Table({
  tableName: "orders"
})
export class OrdersModel extends Model {
  @IsUUID("all")
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id!: string;

  @ForeignKey(() => CustomersModel)
  @IsUUID("all")
  @Column({
    type: DataType.UUID
  })
  customer_id!: string;

  @Column({ type: DataType.STRING(20) })
  status!: string;

  @Column({ type: DataType.DATE })
  date!: Date;

  @HasMany(() => OrdersItemsModel)
  ordersItems!: OrdersItemsModel[];

  @BelongsTo(() => CustomersModel)
  customers!: CustomersModel;
}
