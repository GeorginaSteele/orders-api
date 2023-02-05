import {
  Column,
  DataType,
  HasMany,
  IsUUID,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import { OrdersItemsModel } from "./OrdersItems";

@Table({
  tableName: "items"
})
export class ItemsModel extends Model {
  @IsUUID("all")
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id!: string;

  @Column({ type: DataType.STRING(200) })
  name!: string;

  @Column({ type: DataType.REAL })
  cost!: number;

  @HasMany(() => OrdersItemsModel)
  ordersItems!: OrdersItemsModel[];
}
