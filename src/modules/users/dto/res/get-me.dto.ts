import { User } from "../../user.entity";

export class GetMeDto {
    id: string;
    name: string;
    type: string;
    createdAt: Date;


    constructor(user : User) {
        this.id = user.id;
        this.name = user.name;
        this.type = user.type;
        this.createdAt = user.createdAt;
    }
}