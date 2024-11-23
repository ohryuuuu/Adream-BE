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

@Injectable()
export class RecruitmentsService {

    constructor(
        private usersRepository: UsersRepository,
        private recruiterProfileRepository: RecruiterProfilesRepository,
        private recruitmentsRepository: RecruitmentsRepository,
        private recruiterProfilesService : RecruiterProfilesService
    ) {}

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
        .reviewStatus(ReviewStatus.WAITING)
        .build();
        await newRecruitment.save();
    }


    

    private async checkDeadline(deadline: Date) {
        const todayDate = new Date();
        const deadlineDate = new Date(deadline);
        const minDate = new Date(todayDate.setDate(todayDate.getDate() + 1));
        if(deadlineDate > minDate) {
            throw new DeadlineTightException();
        }
    }

}
