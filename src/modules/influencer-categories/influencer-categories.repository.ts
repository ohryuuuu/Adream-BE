import { CustomRepository } from "src/config/typeorm/typeorm-ex.decorator";
import { InfluencerCategory } from "./influencer-category.entity";
import { In, Repository } from "typeorm";
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

    async findByIds(categoryIds : string[]) {
        const categories = await this.findBy({id:In(categoryIds)});
        return categories;
    }

}