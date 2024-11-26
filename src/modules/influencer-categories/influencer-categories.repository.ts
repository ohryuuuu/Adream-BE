import { CustomRepository } from "src/config/typeorm/typeorm-ex.decorator";
import { InfluencerCategory } from "./influencer-category.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";

@CustomRepository(InfluencerCategory)
export class InfluencerCategoriesRepository extends Repository<InfluencerCategory> {

    async getOneById(id:string) {
        const influencerCategory = await this.findOneBy({
            id
        });
        if(!influencerCategory) throw new NotFoundException();
        return influencerCategory;
    }

}