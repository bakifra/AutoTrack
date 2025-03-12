import { RolesService } from "./roles.service";
import { CreateRoleDto } from "src/users/dto/create-role.dto";
import { Role } from "./roles.model";
export declare class RolesController {
    private roleService;
    constructor(roleService: RolesService);
    getAll(): Promise<Role[]>;
    create(dto: CreateRoleDto): Promise<Role>;
    getById(id: number): Promise<Role | null>;
    getByValue(value: string): Promise<Role | null>;
}
