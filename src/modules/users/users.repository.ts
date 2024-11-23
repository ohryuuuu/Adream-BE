import { CustomRepository } from "src/config/typeorm/typeorm-ex.decorator";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";

@CustomRepository(User)
export class UsersRepository extends Repository<User> {

    async findOneById(id : string) : Promise<User | null> {
        return await this.findOneBy({
            id
        });
    }

    async getOneById(id : string) : Promise<User | null> {
        const user = await this.findOneBy({
            id
        });
        if(!user) throw new NotFoundException();
        return user;
    }

    async findOneByEmail(email : string) : Promise<User | null> {
        return await this.findOneBy({
            email
        });
    }

    async getOneByEmail(email : string) : Promise<User> {
        const user = await this.findOneBy({
            email
        });
        if(!user) throw new NotFoundException();
        return user;
    }


}