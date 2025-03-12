import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "src/roles/roles.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleRepository: RolesService
  ) {}
  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    // const role = await this.roleRepository.getRoleByValue("viewer");
    // console.log(user, "USER!!!");
    return user;
  }
  async getAll() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByLogin(login: string) {
    const user = await this.userRepository.findOne({
      where: { login },
      include: { all: true },
    });
    return user;
  }
}
