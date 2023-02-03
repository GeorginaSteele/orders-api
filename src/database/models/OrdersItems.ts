import {
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  BelongsTo
} from "sequelize-typescript";
import { Items } from "./Items";
import { Orders } from "./Orders";

@Table({
  tableName: "orders_items"
})
export class OrdersItems extends Model {
  @IsUUID("all")
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  id!: number;

  @ForeignKey(() => Orders)
  @IsUUID("all")
  @Column({
    type: DataType.UUID
  })
  order_id!: string;

  @ForeignKey(() => Items)
  @IsUUID("all")
  @Column({
    type: DataType.UUID
  })
  item_id!: string;

  @Column({ type: DataType.INTEGER })
  qty!: string;

  @Column({ type: DataType.STRING(20) })
  notes!: string;

  @BelongsTo(() => Orders)
  orders!: Orders;
}
