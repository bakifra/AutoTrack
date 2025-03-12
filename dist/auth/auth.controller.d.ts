import { CreateUserDto } from "src/users/dto/create-user.dto";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDTO: CreateUserDto): Promise<{
        token: string;
    }>;
    registration(userDTO: CreateUserDto): Promise<{
        token: string;
    }>;
}
