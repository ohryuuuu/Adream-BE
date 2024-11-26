import { Injectable } from '@nestjs/common';
import { InfluencerCategoriesRepository } from './influencer-categories.repository';
import { AddInfluencerCategoryDto } from './dto/req/add-influencer-category.dto';
import { InfluencerCategory } from './influencer-category.entity';
import { Builder } from 'builder-pattern';

@Injectable()
export class InfluencerCategoriesService {

    constructor(
        private influencerCategoriesRepository : InfluencerCategoriesRepository
    ) {}

    async getInfluencerCategories() {
        return await this.influencerCategoriesRepository.find();
    }

    async addInfluencerCategory(addDto: AddInfluencerCategoryDto) {
        const newCategory = Builder(InfluencerCategory)
        .name(addDto.name)
        .img(addDto.img)
        .description(addDto.description)
        .build();
        await newCategory.save();
    }

    async deleteInfluencerCategory(influencerCategoryId: string) {
        const influencerCategory = await this.influencerCategoriesRepository.getOneById(influencerCategoryId);
        await influencerCategory.remove();
    }

}
