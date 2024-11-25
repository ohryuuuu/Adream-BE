import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { GetUserId } from '../auth/decorators/get-user-id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt_auth.guard';
import { AddRecruitmentDto } from './dto/req/add-recruitment.dto';
import { RecruitmentsService } from './recruitments.service';
import { ReviewRecruitmentDto } from './dto/req/review-recruitment.dto';
import { UserType } from '../users/constants/user-type.enum';
import { CursorPaginationReqDto } from 'src/common/dto/req/cursor-pagination-req.dto';

@Controller('recruitments')
export class RecruitmentsController {

    constructor(
        private recruitmentsService : RecruitmentsService
    ) {}

    @Get()
    async findRecruitments(@Query() cursorPaginationReqDto: CursorPaginationReqDto) {
        return await this.recruitmentsService.findRecruitments(cursorPaginationReqDto);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async addRecruitment(@GetUserId() userId: string, @Body() addRecruitmentDto: AddRecruitmentDto) {
        return await this.recruitmentsService.addRecruitment(userId, addRecruitmentDto);
    }

    @Patch('/:recruitment_id')
    @UseGuards(JwtAuthGuard)
    // @Roles(UserType.ADMIN)
    async reviewRecruitment(@Param('recruitment_id', ParseIntPipe) recruitmentId: number, @Body() reviewRecruitmentDto : ReviewRecruitmentDto) {
        return await this.recruitmentsService.reviewRecruitment(recruitmentId, reviewRecruitmentDto);
    }


}
