import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({
    example: "Диспетчер",
    description: "Роль пользователя",
  })
  readonly role_name: string;
}
