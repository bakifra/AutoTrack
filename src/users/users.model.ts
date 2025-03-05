import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs {
  login: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: "Уникальный id" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "user@mail.ru",
    description: "Уникальный login пользователя",
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @ApiProperty({ example: "1234567", description: "Пароль для пользователя" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 1, description: "Роль пользователя" })
  @Column({ type: DataType.SMALLINT })
  role: number;

  @ApiProperty({ example: true, description: "Был ли пользователь удалён" })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  active: boolean;
}
