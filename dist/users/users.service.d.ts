import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "src/roles/roles.service";
export declare class UsersService {
    private userRepository;
    private roleRepository;
    constructor(userRepository: typeof User, roleRepository: RolesService);
    createUser(dto: CreateUserDto): Promise<User>;
    getAll(): Promise<User[]>;
    getUserByLogin(login: string): Promise<User | null>;
}
