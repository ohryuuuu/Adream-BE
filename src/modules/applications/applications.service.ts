import { BadRequestException, Injectable } from '@nestjs/common';
import { ApplicationsRepository } from './applications.repository';
import { SubmitApplicationDto } from './dto/req/submit-application.dto';
import { RecruitmentsRepository } from '../recruitments/recruitments.repository';
import { InfluencerProfilesRepository } from '../influencer-profiles/influencer-profiles.repository';
import { VerifyStatus } from '../influencer-profiles/enums/verify-status.enum';

@Injectable()
export class ApplicationsService {

    constructor(
        private applicationsRepository : ApplicationsRepository,
        private recruitmentsRepository : RecruitmentsRepository,
        private influencerProfileRepository : InfluencerProfilesRepository,
    ) {}

    async submitApplication(userId:string, applicationDto:SubmitApplicationDto) {
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
        await application.influencerProfile.checkOwnProfile(userId);
        if(application.influencerProfile.verifyStatus !== VerifyStatus.COMPLETE) throw new BadRequestException();
        await this.applicationsRepository.remove(application);
    }

    


}
