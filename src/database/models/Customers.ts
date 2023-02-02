import {
  Column,
  DataType,
  IsUUID,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";

@Table({
  tableName: "customers"
})
export class Customers extends Model {
  @IsUUID("all")
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id!: string;

  @Column({ type: DataType.STRING(320) })
  email!: string;

  @Column({ type: DataType.STRING(200) })
  given_name!: string;

  @Column({ type: DataType.STRING(200) })
  family_name!: string;
}
