import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(userDTO: CreateUserDto): Promise<{
        token: string;
    }>;
    registration(userDTO: CreateUserDto): Promise<{
        token: string;
    }>;
    private generateToken;
    private validateUser;
}
