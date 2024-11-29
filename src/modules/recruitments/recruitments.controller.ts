import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { GetUserId } from '../auth/decorators/get-user-id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt_auth.guard';
import { AddRecruitmentDto } from './dto/req/add-recruitment.dto';
import { RecruitmentsService } from './recruitments.service';
import { ReviewRecruitmentDto } from './dto/req/review-recruitment.dto';
import { PaginateQuery } from 'nestjs-paginate';
import { EditRecruitmentDto } from './dto/req/edit-recruitment.dto';

@Controller('recruitments')
export class RecruitmentsController {

    constructor(
        private recruitmentsService : RecruitmentsService
    ) {}

    // @Get()
    // async findRecruitment(@Query() query : PaginateQuery) {
    //     return await this.recruitmentsService.getRecruitments(query);
    // }

    @Get('/:recruitment_id')
    async getRecruitmentDetail(@Param('recruitment_id',ParseIntPipe) recruitmentId: number) {
        return await this.recruitmentsService.getRecruitmentDetail(recruitmentId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async addRecruitment(@GetUserId() userId: string, @Body() addRecruitmentDto: AddRecruitmentDto) {
        return await this.recruitmentsService.addRecruitment(userId, addRecruitmentDto);
    }

    @Put('/:recruitment_id')
    @UseGuards(JwtAuthGuard)
    async editRecruitment(@GetUserId() userId: string,@Param('recruitment_id', ParseIntPipe) recruitmentId: number, @Body() editRecruitmentDto : EditRecruitmentDto) {
        return await this.recruitmentsService.editRecruitment(userId, recruitmentId, editRecruitmentDto);
    }

    @Patch('/review/:recruitment_id')
    @UseGuards(JwtAuthGuard)
    // @Roles(UserType.ADMIN)
    async reviewRecruitment(@Param('recruitment_id', ParseIntPipe) recruitmentId: number, @Body() reviewRecruitmentDto : ReviewRecruitmentDto) {
        return await this.recruitmentsService.reviewRecruitment(recruitmentId, reviewRecruitmentDto);
    }


}
