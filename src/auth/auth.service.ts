import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { RolesService } from "src/roles/roles.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/users.model";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDTO: CreateUserDto) {}

  async registration(userDTO: CreateUserDto) {
    const candidate = await this.userService.getUserByLogin(userDTO.login);
    if (candidate) {
      throw new HttpException(
        "Пользователь с таким логином уже существует",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(userDTO.password, 5);
    const user = await this.userService.createUser({
      ...userDTO,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  async generateToken(user: User) {
    const payload = { id: user.id, login: user.dataValues.login };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
