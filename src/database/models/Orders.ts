import {
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import { Customers } from "./Customers";

@Table({
  tableName: "orders"
})
export class Orders extends Model {
  @IsUUID("all")
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id!: string;

  @ForeignKey(() => Customers)
  @IsUUID("all")
  @Column({
    type: DataType.UUID
  })
  customer_id!: string;

  @Column({ type: DataType.STRING(20) })
  status!: string;

  @Column({ type: DataType.DATE })
  date!: Date;
}
