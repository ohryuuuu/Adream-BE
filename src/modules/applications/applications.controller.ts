import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationDto } from './dto/req/application.dto';
import { GetUserId } from '../auth/decorators/get-user-id.decorator';

@Controller('applications')
export class ApplicationsController {

    constructor(
        private applicationsService : ApplicationsService
    ) {}


    @Post()
    async applicateToRecruitment(@GetUserId() userId:string, @Body() applicationDto : ApplicationDto) {
        return await this.applicationsService.applicateToRecruitment(userId, applicationDto);
    }

    @Delete('/:applicationId')
    async cancelApplication(@GetUserId() userId:string, @Param('applicationId') applicationId: string) {
        return await this.applicationsService.cancelApplication(userId, applicationId);
    }

    @Get()
    async findApplications(
        @Query('recruitmentId', ParseIntPipe) recruitmentId: string, 
        @Query('influencerProfileId') influencerProfileId: string)
    {
        //
    }

    
}
