import { Injectable } from '@nestjs/common';
import { RecruiterProfilesRepository } from '../recruiter-profiles/recruiter-profiles.repository';
import { RecruitmentsRepository } from './recruitments.repository';
import { AddRecruitmentDto } from './dto/req/add-recruitment.dto';
import { DeadlineIsTooTightException } from './exceptions/deadline-is-too-tight.exception';
import { ReviewRecruitmentDto } from './dto/req/review-recruitment.dto';
import { Transactional } from 'typeorm-transactional';
import {  PaginateQuery } from 'nestjs-paginate';
import { EditRecruitmentDto } from './dto/req/edit-recruitment.dto';
import { RecruitmentDetailDto } from './dto/res/recruitment-detail.dto';


@Injectable()
export class RecruitmentsService {

    constructor(
        private recruiterProfileRepository: RecruiterProfilesRepository,
        private recruitmentsRepository: RecruitmentsRepository,
    ) {}

    @Transactional()
    async addRecruitment(userId:string, addDto: AddRecruitmentDto) {
        const recruiterProfile = await this.recruiterProfileRepository.getOneById(addDto.recruiterProfileId);
        await recruiterProfile.checkOwnProfile(userId);
        await this.checkDeadline(addDto.deadline);
        const newRecruitment = this.recruitmentsRepository.create({     
            title: addDto.title,
            description : addDto.description,
            supportMethodA: addDto.supportMethodA,
            supportMethodB: addDto.supportMethodB,
            priceRangeType: addDto.priceRangeType,
            price: addDto.price,
            deadline: addDto.deadline,
            recruiterProfile
        });
        await this.recruitmentsRepository.save(newRecruitment);
    }
    
    @Transactional()
    async editRecruitment(userId:string, recruitmentId:number, editDto:EditRecruitmentDto) {
        const recruitment = await this.recruitmentsRepository.getOneById(recruitmentId);
        const recruiterProfile = await recruitment?.recruiterProfile;
        await recruiterProfile.checkOwnProfile(userId);
        await this.checkDeadline(editDto.deadline);
        await this.recruitmentsRepository.update(recruitmentId, { 
            title: editDto.title,
            description : editDto.description,
            supportMethodA: editDto.supportMethodA,
            supportMethodB: editDto.supportMethodB,
            priceRangeType: editDto.priceRangeType,
            price: editDto.price,
            deadline: editDto.deadline,
        });
    }

    @Transactional()
    async reviewRecruitment(recruitmentId:number, reviewDto: ReviewRecruitmentDto) :Promise<void> {
        const recruitment = await this.recruitmentsRepository.getOneById(recruitmentId);
        recruitment.review.content = reviewDto.content;
        recruitment.review.status = reviewDto.status;
        await recruitment.save();
        //알림날리기
    }

    @Transactional()
    async getRecruitmentDetail(recruitmentId: number) : Promise<RecruitmentDetailDto> {
        const recruitment = await this.recruitmentsRepository.getOneById(recruitmentId);
        const recruiterProfile = await recruitment?.recruiterProfile;
        const authorUser =  await recruiterProfile?.user;
        const returnDto = new RecruitmentDetailDto(recruitment);
        returnDto.setAuthor(authorUser);
        returnDto.setRecruiterProfile(recruiterProfile);
        return returnDto;
    }


    async getRecruitments(query : PaginateQuery) {}


    private async checkDeadline(deadline: Date) {
        const nowDateTime = new Date();
        const deadlineDateTime = new Date(deadline);
        const minDateTime = new Date(nowDateTime.getTime() +  (1 * 24 * 36000));
        if(deadlineDateTime.getTime() < minDateTime.getTime()) {
            throw new DeadlineIsTooTightException();
        }
    }

}
