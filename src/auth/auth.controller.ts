import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { AuthService } from "./auth.service";

@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  login(@Body() userDTO: CreateUserDto) {
    return this.authService.login(userDTO);
  }
  @Post("/registration")
  registration(@Body() userDTO: CreateUserDto) {
    return this.authService.registration(userDTO);
  }
}
