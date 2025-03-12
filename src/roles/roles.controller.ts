import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "src/users/dto/create-role.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Role } from "./roles.model";

@Controller("roles")
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: "Получить список всех доступных ролей" })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  getAll() {
    return this.roleService.getAll();
  }
  @ApiOperation({ summary: "Создание новой роли для пользователей" })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }
  @ApiOperation({ summary: "Получить роль по её id" })
  @ApiResponse({ status: 200, type: Role })
  @Get("/:id")
  getById(@Param("id") id: number) {
    return this.roleService.getRoleById(id);
  }

  @ApiOperation({ summary: "Получить роль по её имени" })
  @ApiResponse({ status: 200, type: Role })
  @Get("/name/:value")
  getByValue(@Param("value") value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
