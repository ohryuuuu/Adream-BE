import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { SubmitApplicationDto } from './dto/req/submit-application.dto';
import { GetUserId } from '../auth/decorators/get-user-id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt_auth.guard';

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationsController {

    constructor(
        private applicationsService : ApplicationsService
    ) {}

    @Post()
    async submitApplication(@GetUserId() userId:string, @Body() applicationDto : SubmitApplicationDto) {
        return await this.applicationsService.submitApplication(userId, applicationDto);
    }

    @Delete('/:application_id')
    async cancelApplication(@GetUserId() userId:string, @Param('application_id') applicationId: string) {
        return await this.applicationsService.cancelApplication(userId, applicationId);
    }
    
}

