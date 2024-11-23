import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt_auth.guard';
import { GetUserId } from '../auth/decorators/get-user-id.decorator';
import { RecruiterProfilesService } from './recruiter-profiles.service';
import { AddRecruiterProfileDto } from './dto/req/add-recruiter-profile.dto';
import { UpdateRecruiterProfileDto } from './dto/req/update-recruiter-profile.dto';
import { BusinessInfoDto } from './dto/req/business-info.dto';
import { NationalTaxService } from './national-tax-service.api';

@UseGuards(JwtAuthGuard)
@Controller('recruiter_profiles')
export class RecruiterProfilesController {

    constructor(
        private recruiterProfilesService : RecruiterProfilesService,
        private nationalTaxService : NationalTaxService,
    ) {}

    @Get('my')
    async getMyRecruiterProfiles(@GetUserId() userId : string) {
        return await this.recruiterProfilesService.getMyRecruiterProfiles(userId);
    }

    @Post('my')
    async addMyRecruiterProfile(@GetUserId() userId: string, @Body() addRecruiterProfileDto: AddRecruiterProfileDto) {
        return await this.recruiterProfilesService.addMyRecruiterProfile(userId, addRecruiterProfileDto);
    }

    @Put('/:recruiter_profile_id')
    async updateMyRecruiterProfile(@GetUserId() userId: string, @Param('recruiter_profile_id') recruiterProfileId : string, @Body() updateMyRecruiterProfileDto: UpdateRecruiterProfileDto) {
        return await this.recruiterProfilesService.updateMyRecruiterProfile(userId, recruiterProfileId, updateMyRecruiterProfileDto);
    }

    @Delete("/:recruiter_profile_id")
    async deleteMyRecruiterProfile(@GetUserId() userId: string, @Param('recruiter_profile_id') recruiterProfileId : string) {
        return await this.recruiterProfilesService.deleteMyRecruiterProfile(userId, recruiterProfileId);
    }

    @Get('is_business_working')
    async isBusinessWorking(@Body() isBusinessWorkingDto : BusinessInfoDto) {
        return await this.nationalTaxService.isBusinessWorking(isBusinessWorkingDto);
    }

}
