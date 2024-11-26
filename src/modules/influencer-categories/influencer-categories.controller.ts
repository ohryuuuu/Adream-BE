import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InfluencerCategoriesService } from './influencer-categories.service';
import { AddInfluencerCategoryDto } from './dto/req/add-influencer-category.dto';

@Controller('influencer-categories')
export class InfluencerCategoriesController {

    constructor(
        private influencerCategoriesService : InfluencerCategoriesService
    ) {}

    @Get()
    async getInfluencerCategories() {
        return await this.influencerCategoriesService.getInfluencerCategories();
    }

    @Post()
    // @Roles(UserType.ADMIN)
    async addInfluencerCategory(@Body() addInfluencerCategoryDto: AddInfluencerCategoryDto) {
        return await this.influencerCategoriesService.addInfluencerCategory(addInfluencerCategoryDto);
    }

    @Delete("/:influencer_category_id")
    // @Roles(UserType.ADMIN)
    async deleteInfluencerCategory(@Param('influencer_category_id') influencerCategoryId : string) {
        return await this.influencerCategoriesService.deleteInfluencerCategory(influencerCategoryId);
    }

}
