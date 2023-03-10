import {
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  BelongsTo,
  AutoIncrement
} from "sequelize-typescript";
import { ItemsModel } from "./Items";
import { OrdersModel } from "./Orders";

@Table({
  tableName: "orders_items"
})
export class OrdersItemsModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id!: number;

  @ForeignKey(() => OrdersModel)
  @IsUUID("all")
  @Column({
    type: DataType.UUID
  })
  order_id!: string;

  @ForeignKey(() => ItemsModel)
  @IsUUID("all")
  @Column({
    type: DataType.UUID
  })
  item_id!: string;

  @Column({ type: DataType.INTEGER })
  qty!: number;

  @Column({ type: DataType.STRING(20) })
  notes!: string;

  @BelongsTo(() => OrdersModel)
  orders!: OrdersModel;
}
