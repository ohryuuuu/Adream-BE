import { Injectable } from '@nestjs/common';
import { InfluencerCategoriesRepository } from './influencer-categories.repository';
import { AddInfluencerCategoryDto } from './dto/req/add-influencer-category.dto';
import { InfluencerCategory } from './influencer-category.entity';

@Injectable()
export class InfluencerCategoriesService {

    constructor(
        private influencerCategoriesRepository : InfluencerCategoriesRepository
    ) {}

    async getInfluencerCategories() : Promise<InfluencerCategory[]> {
        return await this.influencerCategoriesRepository.find();
    }

    async addInfluencerCategory(addDto: AddInfluencerCategoryDto) : Promise<void> {
        const newCategory = this.influencerCategoriesRepository.create(addDto);
        await newCategory.save();
    }

    async deleteInfluencerCategory(influencerCategoryId: string) : Promise<void> {
        const influencerCategory = await this.influencerCategoriesRepository.getOneById(influencerCategoryId);
        await influencerCategory.remove();
    }

}
