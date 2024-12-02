import { UserType } from "src/modules/users/enums/user-type.enum";

export interface JwtPayload {
    id : string;
    email : string;
    name : string;
    type : UserType;
}