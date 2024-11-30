import { Injectable } from '@nestjs/common';
import { ApplicationsRepository } from './applications.repository';
import { ApplicationDto } from './dto/req/application.dto';
import { RecruitmentsRepository } from '../recruitments/recruitments.repository';
import { InfluencerProfilesRepository } from '../influencer-profiles/influencer-profiles.repository';

@Injectable()
export class ApplicationsService {

    constructor(
        private applicationsRepository : ApplicationsRepository,
        private recruitmentsRepository : RecruitmentsRepository,
        private influencerProfileRepository : InfluencerProfilesRepository,
    ) {}


    async applicateToRecruitment(userId:string, applicationDto:ApplicationDto) {
        const recruitment = await this.recruitmentsRepository.getOneById(applicationDto.recruitmentId);
        const influencerProfile = await this.influencerProfileRepository.getOneById(applicationDto.influencerProfileId);
        await influencerProfile.checkOwnProfile(userId);
        const newApplication = this.applicationsRepository.create({
            recruitment,
            influencerProfile,
            appeal : applicationDto.appeal
        });
        await this.applicationsRepository.save(newApplication);
    }

    async cancelApplication(userId:string, applicationId:string) {
        const application = await this.applicationsRepository.getOneById(applicationId);
        const influencerProfile = await application.influencerProfile;
        await influencerProfile.checkOwnProfile(userId);
        await this.applicationsRepository.remove(application);
    }


    


}
