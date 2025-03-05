import { Model } from "sequelize-typescript";
interface RoleCreationAttrs {
    role_name: string;
}
export declare class Role extends Model<Role, RoleCreationAttrs> {
    id: number;
    role_name: string;
}
export {};
