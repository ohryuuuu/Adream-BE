import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InfluencerProfilesService } from './influencer-profiles.service';

@Controller('influencer-profiles')
export class InfluencerProfilesController {

    constructor(
        private influencerProfilesService: InfluencerProfilesService
    ) {}

    @Get('my')
    async getMyInfluencerProfiles() {
        
    }

    @Delete('/:influencer_profile_id')
    async deleteInfluencerProfileId(@Param('influencer_profile_id') influencerProfileId: string) {

    }

    @Post('my')
    async addMyInfluencerProfile() {

    }

}
