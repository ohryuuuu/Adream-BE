import { UserType } from "src/modules/users/constants/user-type.enum";

export interface JwtPayload {
    id : string;
    email : string;
    name : string;
    type : UserType;
}