import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
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

  async login(userDTO: CreateUserDto) {
    console.log("LOGIN...");
    const user = await this.validateUser(userDTO);
    console.log("LOGINED user", user);
    console.log("TOKEN", this.generateToken(user));
    return this.generateToken(user);
  }

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

  private async generateToken(user: User) {
    const payload = { id: user.id, login: user.dataValues.login };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDTO: CreateUserDto) {
    const user = await this.userService.getUserByLogin(userDTO.login);

    if (!user) {
      console.warn(`Пользователь с логином ${userDTO.login} не найден`);
      throw new UnauthorizedException({
        message: "Некорректный login или пароль",
      });
    }

    if (!user.dataValues.password) {
      console.warn(`У пользователя ${userDTO.login} отсутствует пароль`);
      throw new UnauthorizedException({
        message: "Некорректный login или пароль",
      });
    }

    const passwordEquals = await bcrypt.compare(
      userDTO.password,
      user.dataValues.password
    );

    if (!passwordEquals) {
      console.warn(`Неверный пароль для пользователя ${userDTO.login}`);
      throw new UnauthorizedException({
        message: "Некорректный login или пароль",
      });
    }
    console.warn(`OK! ${userDTO.login}`);
    return user;
  }
}
