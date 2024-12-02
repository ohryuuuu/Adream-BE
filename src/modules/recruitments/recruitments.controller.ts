import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { GetUserId } from '../auth/decorators/get-user-id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt_auth.guard';
import { AddRecruitmentDto } from './dto/req/add-recruitment.dto';
import { RecruitmentsService } from './recruitments.service';
import { ReviewRecruitmentDto } from './dto/req/review-recruitment.dto';
import { EditRecruitmentDto } from './dto/req/edit-recruitment.dto';
import { GetPaginateQuery } from 'src/common/decorators/get-paginate-query';
import { PaginateQueryDto } from 'src/common/dto/req/paginate-query.dto';

@Controller('recruitments')
@UseGuards(JwtAuthGuard)
export class RecruitmentsController {

    constructor(
        private recruitmentsService : RecruitmentsService
    ) {}

    @Get()
    async searchRecruitments(@GetPaginateQuery() paginateQuery : PaginateQueryDto) {
        // 메인페이지에 뜨게 될 공고들을 들고오는 API이다
        return await this.recruitmentsService.searchRecruitments(paginateQuery);


        // 다음으로
        // 정렬순서 : 지원자많은순,최신순
        // +페이지네이션
        // 필수로 만료된 공고 제외
    }

    @Post()
    async addRecruitment(@GetUserId() userId: string, @Body() addRecruitmentDto: AddRecruitmentDto) {
        return await this.recruitmentsService.addRecruitment(userId, addRecruitmentDto);
    }

    @Get('/:recruitment_id')
    async getRecruitmentDetail(@Param('recruitment_id', ParseIntPipe) recruitmentId: number) {
        return await this.recruitmentsService.getRecruitmentDetail(recruitmentId);
    }

    @Put('/:recruitment_id')
    async editRecruitment(@GetUserId() userId: string,@Param('recruitment_id', ParseIntPipe) recruitmentId: number, @Body() editRecruitmentDto : EditRecruitmentDto) {
        return await this.recruitmentsService.editRecruitment(userId, recruitmentId, editRecruitmentDto);
    }

    @Patch('/:recruitment_id/review')
    //@Roles() //admin만
    async reviewRecruitment(@Param('recruitment_id', ParseIntPipe) recruitmentId: number, @Body() reviewRecruitmentDto : ReviewRecruitmentDto) {
        return await this.recruitmentsService.reviewRecruitment(recruitmentId, reviewRecruitmentDto);
    }

    @Get('/:recruitment_id/applications')
    async getApplications(@GetUserId() userId: string) {
        //공고 작성자가 해당 공고에대한 신청서들을 들고오는 API이다.
    }

}
