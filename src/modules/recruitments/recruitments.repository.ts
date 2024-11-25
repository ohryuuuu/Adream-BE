import { CustomRepository } from "src/config/typeorm/typeorm-ex.decorator";
import { Recruitment } from "./recruitment.entity";
import { LessThan, MoreThan, Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { CreatedOrder } from "src/common/constants/created-order.enum";
import { ReviewStatus } from "./constants/review-status.enum";


@CustomRepository(Recruitment)
export class RecruitmentsRepository extends Repository<Recruitment> {

    async getOneById(id:number) {
        const recruitment = await this.findOneBy({
            id
        });
        if(!recruitment) throw new NotFoundException();
        return recruitment;
    }

    async findByRecruiterProfileId(recruiterProfileId: string) {
        return await this.findBy({
            recruiterProfile: {
                id: recruiterProfileId
            }
        });
    }

    async findApproved(cursorId:number, take: number, createdOrder:CreatedOrder) {
        return await this.findAndCount({
            where : {
                id: createdOrder === CreatedOrder.ASC ? MoreThan(cursorId) : LessThan(cursorId),
                reviewStatus: ReviewStatus.APPROVED
            },
            take: take,
        });
    }

}