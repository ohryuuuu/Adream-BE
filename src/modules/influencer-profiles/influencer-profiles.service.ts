import { BadRequestException, Injectable } from '@nestjs/common';
import { InfluencerProfileRepository } from './influencer-profiles.repository';
import { GetMyInfluencerProfilesItemDto } from './dto/res/get-my-influencer-profiles.dto';
import { AddMyInfluencerProfileDto } from './dto/req/add-my-influencer-profile.dto';
import { UsersRepository } from '../users/users.repository';
import { InfluencerCategoriesRepository } from '../influencer-categories/influencer-categories.repository';
import { InfluencerProfile } from './influencer-profile.entity';
import { Builder } from 'builder-pattern';
import { VerifyStatus } from './constants/verify-status.enum';
import { ProfileInfoAlreadyExistsException } from './exceptions/profile-info-already-exists.exception';

@Injectable()
export class InfluencerProfilesService {

    constructor(
        private influencerProfilesRepository : InfluencerProfileRepository,
        private usersRepository : UsersRepository,
        private categoryRepository : InfluencerCategoriesRepository
    ) {}

    async getMyInfluencerProfiles(userId:string) : Promise<GetMyInfluencerProfilesItemDto[]> {
        const influencerProfiles = await this.influencerProfilesRepository.findByUserId(userId);
        return influencerProfiles.map((influencerProfile) => (
            new GetMyInfluencerProfilesItemDto(influencerProfile)
        ));
    }

    async deleteInfluencerProfileId(userId:string, influencerProfileId: string) : Promise<void> {
        const influencerProfile = await this.influencerProfilesRepository.getOneById(influencerProfileId);
        await influencerProfile.checkOwnProfile(userId);
        await this.influencerProfilesRepository.softRemove(influencerProfile);
    }

    async addMyInfluencerProfile(userId:string, addMyInfluencerProfileDto : AddMyInfluencerProfileDto) {
        const user = await this.usersRepository.getOneById(userId);
        const categories = await this.categoryRepository.findByCategoryIds(addMyInfluencerProfileDto.categoryIds);
        const sameprofile = this.influencerProfilesRepository.findSameOneInMyInfluencerProfiles(addMyInfluencerProfileDto.platform, addMyInfluencerProfileDto.tagId, userId);
        if(categories.length<1 || categories.length>3) throw new BadRequestException();
        if(sameprofile) throw new ProfileInfoAlreadyExistsException();
        const influencerProfile = Builder(InfluencerProfile)
        .platform(addMyInfluencerProfileDto.platform)
        .tagId(addMyInfluencerProfileDto.tagId)
        .contactEmail(addMyInfluencerProfileDto.contactEmail)
        .categories(categories)
        .user(user)
        .verifyStatus(VerifyStatus.BEFORE)
        .build();
        await influencerProfile.save();
    }

    async getVerifyCode() {}
    async verifySocialAccount() {}



}
