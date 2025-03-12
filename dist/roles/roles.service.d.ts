import { CreateRoleDto } from "src/users/dto/create-role.dto";
import { Role } from "./roles.model";
export declare class RolesService {
    private roleRepository;
    constructor(roleRepository: typeof Role);
    createRole(dto: CreateRoleDto): Promise<Role>;
    getRoleByValue(value: string): Promise<Role | null>;
    getRoleById(id: number): Promise<Role | null>;
    getAll(): Promise<Role[]>;
}
