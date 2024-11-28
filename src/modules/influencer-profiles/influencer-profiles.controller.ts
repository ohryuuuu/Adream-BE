import { Body, Controller, Delete, Get, Param, ParseEnumPipe, Post, Query } from '@nestjs/common';
import { InfluencerProfilesService } from './influencer-profiles.service';
import { GetUserId } from '../auth/decorators/get-user-id.decorator';
import { AddMyInfluencerProfileDto } from './dto/req/add-my-influencer-profile.dto';
import { SocialPlatform } from './constants/social-platform.enum';

@Controller('influencer-profiles')
export class InfluencerProfilesController {

    constructor(
        private influencerProfilesService: InfluencerProfilesService
    ) {}

    @Get('my')
    async getMyInfluencerProfiles(@GetUserId() userId: string) {
        return await this.influencerProfilesService.getMyInfluencerProfiles(userId);
    }

    @Delete('/:influencer_profile_id')
    async deleteMyInfluencerProfile(@GetUserId() userId: string, @Param('influencer_profile_id') influencerProfileId: string) {
        return await this.influencerProfilesService.deleteMyInfluencerProfile(userId, influencerProfileId);
    }

    @Post('my')
    async addMyInfluencerProfile(@GetUserId() userId:string, @Body() addMyInfluencerProfileDto : AddMyInfluencerProfileDto) {
        return await this.influencerProfilesService.addMyInfluencerProfile(userId, addMyInfluencerProfileDto);
    }

    @Get('/verify_url')
    async getVerify(@Query('platform') platform: SocialPlatform) {
        return await this.influencerProfilesService.getVerifyUrl(platform);
    }

    @Post('/:influencer_profile_id/verify')
    async verifySocialAccount(@Param('influencer_profile_id') influencerProfileId: string) {
        return await this.influencerProfilesService.verifySocialAccount(influencerProfileId);
    }


    ///https://www.npmjs.com/package/instagram-scraping
    ///https://www.npmjs.com/package/scraper-instagram
    ///https://www.npmjs.com/package/youtube-comment-scraper

}



//https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-media/comments?locale=ko_KR
//https://console.cloud.google.com/apis/credentials?inv=1&invt=AbirLw&project=adream-443107