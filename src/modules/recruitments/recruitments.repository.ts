import { CustomRepository } from "src/config/typeorm/typeorm-ex.decorator";
import { Recruitment } from "./recruitment.entity";
import { MoreThan, Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";


@CustomRepository(Recruitment)
export class RecruitmentsRepository extends Repository<Recruitment> {

    async getOneById(id:number) {
        const recruitment = await this.findOneBy({
            id
        });
        if(!recruitment) throw new NotFoundException();
        return recruitment;
    }


}