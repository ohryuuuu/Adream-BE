import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InfluencerProfileRepository } from './influencer-profiles.repository';
import { GetMyInfluencerProfilesItemDto } from './dto/res/get-my-influencer-profiles.dto';
import { AddMyInfluencerProfileDto } from './dto/req/add-my-influencer-profile.dto';
import { UsersRepository } from '../users/users.repository';
import { InfluencerCategoriesRepository } from '../influencer-categories/influencer-categories.repository';
import { ProfileInfoAlreadyExistsException } from './exceptions/profile-info-already-exists.exception';
import { VerifyStatus } from './constants/verify-status.enum';
import { generateRandomStr } from 'src/common/utils/random-str';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CACHE_KEYS } from 'src/common/constants/cache-keys';
import { SocialPlatformsService } from 'src/modules/social-platforms/social-platforms.service';
import { UpdateMyInfluencerProfileDto } from './dto/req/update-my-influencer-profile.dto';
import { Transactional } from 'typeorm-transactional';
import { VerifyCodeIsNotCorrectException } from './exceptions/verify-code-is-not-corrrect.exception';


@Injectable()
export class InfluencerProfilesService {

    constructor(
        private influencerProfilesRepository : InfluencerProfileRepository,
        private usersRepository : UsersRepository,
        private categoriesRepository : InfluencerCategoriesRepository,
        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache,
        private socialPlatformsService : SocialPlatformsService,
    ) {}

    readonly VERIFY_EXP_MS = 180000;

    @Transactional()
    async getMyInfluencerProfiles(userId:string) : Promise<GetMyInfluencerProfilesItemDto[]> {
        const influencerProfiles = await this.influencerProfilesRepository.findByUserId(userId);
        return influencerProfiles.map((influencerProfile) => (
            new GetMyInfluencerProfilesItemDto(influencerProfile)
        ));
    }

    @Transactional()
    async deleteMyInfluencerProfile(userId:string, influencerProfileId: string) : Promise<void> {
        const influencerProfile = await this.influencerProfilesRepository.getOneById(influencerProfileId);
        await influencerProfile.checkOwnProfile(userId);
        await this.influencerProfilesRepository.softRemove(influencerProfile);
    }

    @Transactional()
    async addMyInfluencerProfile(userId:string, addDto : AddMyInfluencerProfileDto) {
        const user = await this.usersRepository.getOneById(userId);
        const categories = await this.categoriesRepository.findByCategoryIds(addDto.categoryIds);
        const sameprofile = await this.influencerProfilesRepository.findSameOneInMyInfluencerProfiles(addDto.platform, addDto.tagId, userId);
        if(sameprofile) throw new ProfileInfoAlreadyExistsException();
        const socialInfo = await this.socialPlatformsService.getSocialProfiileByTagId(addDto.platform, addDto.tagId);
        const newInfluencerProfile = this.influencerProfilesRepository.create({
            platform: addDto.platform,
            tagId: addDto.tagId,
            contactEmail: addDto.contactEmail,
            followerCnt: socialInfo.followerCnt,
            img: socialInfo.img,
            categories,
            user,
        });
        await this.influencerProfilesRepository.save(newInfluencerProfile);
    }

    @Transactional()
    async updateMyInfluencerProfile(userId:string, influencerProfileId : string, updateDto : UpdateMyInfluencerProfileDto) {
        const influencerProfile = await this.influencerProfilesRepository.getOneById(influencerProfileId);
        await influencerProfile.checkOwnProfile(userId);
        const categories = await this.categoriesRepository.findByCategoryIds(updateDto.categoryIds);
        const socialInfo = await this.socialPlatformsService.getSocialProfiileByTagId(influencerProfile.platform, influencerProfile.tagId);
        await this.influencerProfilesRepository.update(influencerProfileId, {
            categories,
            contactEmail : updateDto.contactEmail,
            img : socialInfo.img,
            followerCnt : socialInfo.followerCnt,
        });
    }

    @Transactional()
    async getVerifyCode(influencerProfileId: string) {
        const verifyCode = generateRandomStr(6);
        await this.cacheManager.set(CACHE_KEYS.INFLUENCER_PROFILE_VERIFY_CODE(influencerProfileId), verifyCode, this.VERIFY_EXP_MS);
        await this.influencerProfilesRepository.updateVerifyStatus(influencerProfileId, VerifyStatus.PROCESSING);
        return verifyCode;
    }


    @Transactional()
    async verifyProfile(influencerProfileId:string) {
        const influencerProfile = await this.influencerProfilesRepository.getOneById(influencerProfileId);
        const socialInfo = await this.socialPlatformsService.getSocialProfiileByTagId(influencerProfile.platform ,influencerProfile.tagId);
        const verifyCode = await this.cacheManager.get(CACHE_KEYS.INFLUENCER_PROFILE_VERIFY_CODE(influencerProfileId)) as string;
        if(!socialInfo.bio.includes(verifyCode)) throw new VerifyCodeIsNotCorrectException();
        await this.influencerProfilesRepository.updateVerifyStatus(influencerProfileId, VerifyStatus.COMPLETE);
    }

}
