import {
  Column,
  DataType,
  IsUUID,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";

@Table({
  tableName: "items"
})
export class Items extends Model {
  @IsUUID("all")
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id!: string;

  @Column({ type: DataType.STRING(200) })
  name!: string;

  @Column({ type: DataType.REAL })
  cost!: number;
}
