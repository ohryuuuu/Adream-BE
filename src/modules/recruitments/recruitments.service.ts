import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { RecruiterProfilesRepository } from '../recruiter-profiles/recruiter-profiles.repository';
import { RecruitmentsRepository } from './recruitments.repository';
import { AddRecruitmentDto } from './dto/req/add-recruitment.dto';
import { DeadlineTightException } from './exceptions/deadline-tight.exception';
import { ReviewRecruitmentDto } from './dto/req/review-recruitment.dto';
import { Transactional } from 'typeorm-transactional';
import {  PaginateQuery } from 'nestjs-paginate';
import { EditRecruitmentDto } from './dto/req/edit-recruitment.dto';
import { RecruitmentDetailDto } from './dto/res/recruitment-detail.dto';


@Injectable()
export class RecruitmentsService {

    constructor(
        private usersRepository: UsersRepository,
        private recruiterProfileRepository: RecruiterProfilesRepository,
        private recruitmentsRepository: RecruitmentsRepository,
    ) {}

    @Transactional()
    async addRecruitment(userId:string, addDto: AddRecruitmentDto) {
        const user = await this.usersRepository.getOneById(userId);
        const recruiterProfile = await this.recruiterProfileRepository.getOneById(addDto.recruiterProfileId);
        await recruiterProfile.checkOwnProfile(user);
        await this.checkDeadline(addDto.deadline);
        const newRecruitment = this.recruitmentsRepository.create({ ...addDto, recruiterProfile });
        await newRecruitment.save();
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
    async editRecruitment(userId:string, recruitmentId:number, editDto:EditRecruitmentDto) {
        const user = await this.usersRepository.getOneById(userId);
        const recruitment = await this.recruitmentsRepository.getOneById(recruitmentId);
        const recruiterProfile = await recruitment?.recruiterProfile;
        await recruiterProfile.checkOwnProfile(user);
        await this.checkDeadline(editDto.deadline);
        await this.recruitmentsRepository.update(recruitmentId, { ...editDto });
    }
    


    @Transactional()
    async getRecruitmentDetail(recruitmentId: number) : Promise<any> {
        const recruitment = await this.recruitmentsRepository.getOneById(recruitmentId);
        const recruiterProfile = await recruitment?.recruiterProfile;
        const authorUser =  await recruiterProfile?.user;
        const returnDto = new RecruitmentDetailDto(recruitment);
        returnDto.setAuthor(authorUser);
        returnDto.setRecruiterProfile(recruiterProfile);
        return returnDto;
    }



    async getRecruitments(query : PaginateQuery) {
        //
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
