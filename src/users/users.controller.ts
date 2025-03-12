import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { User } from "./users.model";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: "Создание пользователя" })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDTO: CreateUserDto) {
    return this.userService.createUser(userDTO);
  }

  @ApiOperation({ summary: "Получить список всех пользователей" })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.userService.getAll();
  }
}
