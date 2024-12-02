import { CustomRepository } from "src/config/typeorm/typeorm-ex.decorator";
import { Recruitment } from "./recruitment.entity";
import { Repository } from "typeorm";
import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { AdminReview } from "./children-entities/review.entity";


@CustomRepository(Recruitment)
export class RecruitmentsRepository extends Repository<Recruitment> {

    async getOneById(id:number) {
        const recruitment = await this.findOneBy({
            id,
        });
        if(!recruitment) throw new NotFoundException();
        return recruitment;
    }

    async updateReview(id:number, review : AdminReview) {
        const result = await this.update(id, {
            review
        });
        if(!result.affected) throw new HttpException("", HttpStatus.NOT_MODIFIED);
    }


    async addViewCnt(id:number) {
        await this.update(id, {
            viewCnt: () => 'viewCnt + 1',
        });
    }

}