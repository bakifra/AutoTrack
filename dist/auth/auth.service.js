"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    userService;
    jwtService;
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(userDTO) {
        const user = await this.validateUser(userDTO);
        return this.generateToken(user);
    }
    async registration(userDTO) {
        const candidate = await this.userService.getUserByLogin(userDTO.login);
        if (candidate) {
            throw new common_1.HttpException("Пользователь с таким логином уже существует", common_1.HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDTO.password, 5);
        const user = await this.userService.createUser({
            ...userDTO,
            password: hashPassword,
        });
        return this.generateToken(user);
    }
    async generateToken(user) {
        const payload = { id: user.id, login: user.dataValues.login };
        return {
            token: this.jwtService.sign(payload),
        };
    }
    async validateUser(userDTO) {
        const user = await this.userService.getUserByLogin(userDTO.login);
        if (!user) {
            console.warn(`Пользователь с логином ${userDTO.login} не найден`);
            throw new common_1.UnauthorizedException({
                message: "Некорректный login или пароль",
            });
        }
        if (!user.dataValues.password) {
            console.warn(`У пользователя ${userDTO.login} отсутствует пароль`);
            console.log(user, "full user:");
            throw new common_1.UnauthorizedException({
                message: "Некорректный login или пароль",
            });
        }
        const passwordEquals = await bcrypt.compare(userDTO.password, user.dataValues.password);
        if (!passwordEquals) {
            console.warn(`Неверный пароль для пользователя ${userDTO.login}`);
            throw new common_1.UnauthorizedException({
                message: "Некорректный login или пароль",
            });
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map