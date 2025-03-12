import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    example: "user@mail.ru",
    description: "Уникальный login пользователя",
  })
  readonly login: string;
  @ApiProperty({ example: "1234567", description: "Пароль для пользователя" })
  readonly password: string;

  @ApiProperty({ example: "1", description: "id роли пользователя" })
  readonly role: number;
}
