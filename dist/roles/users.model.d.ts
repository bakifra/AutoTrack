import { Model } from "sequelize-typescript";
interface UserCreationAttrs {
    login: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    login: string;
    password: string;
    role: number;
    active: boolean;
}
export {};
