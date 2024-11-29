import { Injectable } from '@nestjs/common';
import { InfluencerCategoriesRepository } from './influencer-categories.repository';
import { AddInfluencerCategoryDto } from './dto/req/add-influencer-category.dto';
import { InfluencerCategory } from './influencer-category.entity';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class InfluencerCategoriesService {

    constructor(
        private influencerCategoriesRepository : InfluencerCategoriesRepository
    ) {}

    @Transactional()
    async getInfluencerCategories() : Promise<InfluencerCategory[]> {
        return await this.influencerCategoriesRepository.find();
    }

    @Transactional()
    async addInfluencerCategory(addDto: AddInfluencerCategoryDto) : Promise<void> {
        const newCategory = this.influencerCategoriesRepository.create({
            name: addDto.name,
            img: addDto.img,
            description: addDto.description
        });
        await this.influencerCategoriesRepository.save(newCategory);
    }

    @Transactional()
    async deleteInfluencerCategory(influencerCategoryId: string) : Promise<void> {
        const influencerCategory = await this.influencerCategoriesRepository.getOneById(influencerCategoryId);
        await this.influencerCategoriesRepository.remove(influencerCategory);
    }

}
