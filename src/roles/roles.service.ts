import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateRoleDto } from "src/users/dto/create-role.dto";
import { Role } from "./roles.model";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({
      where: { role_name: value },
    });
    return role;
  }

  
  async getRoleById(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });
    return role;
  }

  async getAll() {
    const roles = await this.roleRepository.findAll();
    return roles;
  }
}
