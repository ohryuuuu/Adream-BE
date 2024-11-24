import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { RecruiterProfilesRepository } from '../recruiter-profiles/recruiter-profiles.repository';
import { RecruitmentsRepository } from './recruitments.repository';
import { RecruiterProfilesService } from '../recruiter-profiles/recruiter-profiles.service';
import { AddRecruitmentDto } from './dto/req/add-recruitment.dto';
import { Builder } from 'builder-pattern';
import { Recruitment } from './recruitment.entity';
import { ReviewStatus } from './constants/review-status.enum';
import { DeadlineTightException } from './exceptions/deadline-tight.exception';
import { ReviewRecruitmentDto } from './dto/req/review-recruitment.dto';
import { Transactional } from 'typeorm-transactional';
import { CursorPaginationReqDto } from 'src/common/dto/req/cursor-pagination-req.dto';
import { CursorPaginationResDto } from 'src/common/dto/res/cursor-pagination-res.dto';

@Injectable()
export class RecruitmentsService {

    constructor(
        private usersRepository: UsersRepository,
        private recruiterProfileRepository: RecruiterProfilesRepository,
        private recruitmentsRepository: RecruitmentsRepository,
        private recruiterProfilesService : RecruiterProfilesService
    ) {}

    @Transactional()
    async addRecruitment(userId:string, addDto: AddRecruitmentDto) {
        const user = await this.usersRepository.getOneById(userId);
        const recruiterProfile = await this.recruiterProfileRepository.getOneById(addDto.recruiterProfileId);
        await this.recruiterProfilesService.checkOwnProfile(user, recruiterProfile);
        await this.checkDeadline(addDto.deadline);
        const newRecruitment = Builder(Recruitment)
        .title(addDto.title)
        .description(addDto.description)
        .deadline(addDto.deadline)
        .supportMethodA(addDto.supportMethodA)
        .supportMethodB(addDto.supportMethodB)
        .priceRangeType(addDto.priceRangeType)
        .price(addDto.price)
        .recruiterProfile(recruiterProfile)
        .review("심사를 대기합니다")
        .reviewStatus(ReviewStatus.WAITING)
        .build();
        await newRecruitment.save();
    }

    @Transactional()
    async reviewRecruitment(recruitmentId:number, reviewDto: ReviewRecruitmentDto) :Promise<void> {
        const recruitment = await this.recruitmentsRepository.getOneById(recruitmentId);
        recruitment.review = reviewDto.review;
        recruitment.reviewStatus = reviewDto.reviewStatus;
        await recruitment.save();
        //알림날리기
    }
    
    @Transactional()
    async editRecruitment(userId:string, recruitmentId:number, editDto:AddRecruitmentDto) {
        const user = await this.usersRepository.getOneById(userId);
        const recruitment = await this.recruitmentsRepository.getOneById(recruitmentId);
        const recruiterProfile = await recruitment?.recruiterProfile;
        await this.recruiterProfilesService.checkOwnProfile(user, recruiterProfile);
        await this.checkDeadline(editDto.deadline);
        recruitment.title = editDto.title;
        recruitment.description = editDto.description;
        recruitment.deadline = editDto.deadline;
        recruitment.supportMethodA = editDto.supportMethodA;
        recruitment.supportMethodB = editDto.supportMethodB;
        recruitment.priceRangeType = editDto.priceRangeType;
        recruitment.price = editDto.price;
        recruitment.reviewStatus = ReviewStatus.WAITING;
        recruitment.review = "재심사를 대기합니다";
        await recruitment.save();
    }

    @Transactional()
    async findRecruitments(paginationReqDto: CursorPaginationReqDto) : Promise<CursorPaginationResDto<Recruitment>> {
        const [data, total] =  await this.recruitmentsRepository.findApproved(paginationReqDto.cursorId, paginationReqDto.take, paginationReqDto.createdOrder);
        return new CursorPaginationResDto<Recruitment>(data, total, paginationReqDto);
    }

    @Transactional()
    async findRecruitmentsByRecruiterProfileId(profileId: string) {
        return await this.recruitmentsRepository.findByRecruiterProfileId(profileId);
    }

    private async checkDeadline(deadline: Date) {
        const nowDateTime = new Date();
        const deadlineDateTime = new Date(deadline);
        const minDateTime = new Date(nowDateTime.getTime() +  (1 * 24 * 36000));
        if(deadlineDateTime.getTime() < minDateTime.getTime()) {
            throw new DeadlineTightException();
        }
    }

}
