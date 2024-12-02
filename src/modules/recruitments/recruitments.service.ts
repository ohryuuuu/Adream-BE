import { Injectable } from '@nestjs/common';
import { RecruiterProfilesRepository } from '../recruiter-profiles/recruiter-profiles.repository';
import { RecruitmentsRepository } from './recruitments.repository';
import { AddRecruitmentDto } from './dto/req/add-recruitment.dto';
import { DeadlineIsTooTightException } from './exceptions/deadline-is-too-tight.exception';
import { ReviewRecruitmentDto } from './dto/req/review-recruitment.dto';
import { Transactional } from 'typeorm-transactional';
import { EditRecruitmentDto } from './dto/req/edit-recruitment.dto';
import { RecruitmentDetailDto } from './dto/res/recruitment-detail.dto';
import { InfluencerCategoriesRepository } from '../influencer-categories/influencer-categories.repository';
import { ReviewStatus } from './enums/review-status.enum';
import { PaginateQueryDto } from 'src/common/dto/req/paginate-query.dto';
import { PaginationDto } from 'src/common/dto/res/pagination.dto';
import { RecruitmentListItemDto } from './dto/res/recruitment-list-item.dto';
import { SearchRecruitmentsDto } from './dto/req/search-recruitment.dto';


@Injectable()
export class RecruitmentsService {

    constructor(
        private recruiterProfileRepository: RecruiterProfilesRepository,
        private recruitmentsRepository: RecruitmentsRepository,
        private influencerCategoriesRepository :InfluencerCategoriesRepository
    ) {}

    @Transactional()
    async addRecruitment(userId:string, addDto: AddRecruitmentDto) : Promise<void> {
        const recruiterProfile = await this.recruiterProfileRepository.getOneById(addDto.recruiterProfileId);
        await recruiterProfile.checkOwnProfile(userId);
        await this.validateDeadline(addDto.deadline);
        const preferCategories = await this.influencerCategoriesRepository.findByIds(addDto.preferCategoryIds);
        const newRecruitment = this.recruitmentsRepository.create({     
            title: addDto.title,
            description : addDto.description,
            priceRange: addDto.priceRange,
            price: addDto.price,
            anotherSupport: addDto.anotherSupport,
            deadline: addDto.deadline,
            recruiterProfile,
            preferCategories
        });
        await this.recruitmentsRepository.save(newRecruitment);
    }
    
    @Transactional()
    async editRecruitment(userId:string, recruitmentId:number, editDto:EditRecruitmentDto) : Promise<void> {
        const recruitment = await this.recruitmentsRepository.getOneById(recruitmentId);
        await recruitment.recruiterProfile.checkOwnProfile(userId);
        await this.validateDeadline(editDto.deadline);
        const preferCategories = await this.influencerCategoriesRepository.findByIds(editDto.preferCategoryIds);
        await this.recruitmentsRepository.update(recruitmentId, { 
            title: editDto.title,
            description : editDto.description,
            priceRange: editDto.priceRange,
            anotherSupport: editDto.anotherSupport,
            price: editDto.price,
            deadline: editDto.deadline,
            preferCategories,
            review : {
                status : ReviewStatus.WAITING,
                content : "재심사를 대기합니다",
            }
        });
    }

    @Transactional()
    async reviewRecruitment(recruitmentId:number, reviewDto: ReviewRecruitmentDto) : Promise<void> {
        await this.recruitmentsRepository.updateReview(recruitmentId, reviewDto);
        // const recruitment = await this.recruitmentsRepository.getOneById(recruitmentId); 나중에 알림 날리기
    }

    @Transactional()
    async getRecruitmentDetail(recruitmentId: number) : Promise<RecruitmentDetailDto> {
        await this.recruitmentsRepository.addViewCnt(recruitmentId);
        const recruitment = await this.recruitmentsRepository.getOneById(recruitmentId);
        return new RecruitmentDetailDto(recruitment);
    }


    async searchRecruitments(query:PaginateQueryDto) {
        const [recruitments, cnt] = await this.recruitmentsRepository.findAndCount({
            take:query.take,
            skip:query.getSkip(),
        });
        const data = recruitments.map((recruitment) => (new RecruitmentListItemDto(recruitment)));
        return new PaginationDto<RecruitmentListItemDto>(data, cnt, query);
    }

    private async validateDeadline(deadline: Date) : Promise<void> {
        const nowDateTime = new Date();
        const deadlineDateTime = new Date(deadline);
        const minDateTime = new Date(nowDateTime.getTime() +  (1 * 24 * 36000));
        if(deadlineDateTime.getTime() < minDateTime.getTime()) {
            throw new DeadlineIsTooTightException();
        }
    }

}
