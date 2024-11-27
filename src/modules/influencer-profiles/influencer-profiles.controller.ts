import { Controller, Delete, Get, Param, ParseEnumPipe, Post, Query } from '@nestjs/common';
import { InfluencerProfilesService } from './influencer-profiles.service';
import { SocialPlatform } from './constants/social-platform.enum';
import { GetVerifyCodeDto } from './dto/req/get-verify-code.dto';

@Controller('influencer-profiles')
export class InfluencerProfilesController {

    constructor(
        private influencerProfilesService: InfluencerProfilesService
    ) {}

    @Get('my')
    async getMyInfluencerProfiles() {
        // 
    }

    @Delete('/:influencer_profile_id')
    async deleteInfluencerProfileId(@Param('influencer_profile_id') influencerProfileId: string) {
        //
    }

    @Post('my')
    async addMyInfluencerProfile() {
        //
    }


    @Get('/:influencer_profile_id/verify_code')
    async getVerifyCode(@Param('influencer_profile_id') influencerProfileId: string, @Query() getVerifyCodeDto : GetVerifyCodeDto) {
        //influencerProfileId, platform, tagId를 받고
        //verify코드를 생성하고
        //influencerProfileId를 캐시의 키로 설정한다. 그리고 platform, tagId, verifyCode를 캐시의 값들로 설정한다.
        //return { verifyCode, platformContentLink };
    }

    @Post('/:influencer_profile_id/verify')
    async verifySocialAccount(@Param('influencer_profile_id') influencerProfileId: string) {
        //influencerProfileId 받고
        //캐시에서 platform, tagId, verifyCode를 추출한다.
        //해당 platform내 컨텐츠에 tagId계정으로 verifyCode로 댓글이 달렸는지 체크한다.
        //달렸다면 승인해준다.
    }


    ///https://www.npmjs.com/package/instagram-scraping
    ///https://www.npmjs.com/package/scraper-instagram
    ///https://www.npmjs.com/package/youtube-comment-scraper

}
