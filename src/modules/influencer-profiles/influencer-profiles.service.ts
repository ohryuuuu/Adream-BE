import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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
import { VerifyInfoDto } from './dto/res/verify-info';
import { SocialPlatform } from '../social-platforms/constant/social-platform.enum';


@Injectable()
export class InfluencerProfilesService {

    constructor(
        private influencerProfilesRepository : InfluencerProfileRepository,
        private usersRepository : UsersRepository,
        private categoryRepository : InfluencerCategoriesRepository,
        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache,
    ) {}

    readonly VERIFY_EXP_MS = 60000*30;
    readonly VERIFYURL = {
        [SocialPlatform.INSTAGRAM] :"https://www.youtube.com/watch?v=E4nvzs8uSDc",
        [SocialPlatform.YOUTUBE] :""
    };


    async getMyInfluencerProfiles(userId:string) : Promise<GetMyInfluencerProfilesItemDto[]> {
        const influencerProfiles = await this.influencerProfilesRepository.findByUserId(userId);
        return influencerProfiles.map((influencerProfile) => (
            new GetMyInfluencerProfilesItemDto(influencerProfile)
        ));
    }

    async deleteMyInfluencerProfile(userId:string, influencerProfileId: string) : Promise<void> {
        const influencerProfile = await this.influencerProfilesRepository.getOneById(influencerProfileId);
        await influencerProfile.checkOwnProfile(userId);
        await this.influencerProfilesRepository.softRemove(influencerProfile);
    }

    async addMyInfluencerProfile(userId:string, addDto : AddMyInfluencerProfileDto) {
        const user = await this.usersRepository.getOneById(userId);
        const categories = await this.categoryRepository.findByCategoryIds(addDto.categoryIds);
        const sameprofile = await this.influencerProfilesRepository.findSameOneInMyInfluencerProfiles(addDto.platform, addDto.tagId, userId);
        if(categories.length < 1 || categories.length > 3) throw new BadRequestException();
        if(sameprofile) throw new ProfileInfoAlreadyExistsException();
        const newInfluencerProfile = this.influencerProfilesRepository.create({
            platform : addDto.platform,
            tagId : addDto.tagId,
            contactEmail : addDto.contactEmail,
            categories,
            user,
        });
        await this.influencerProfilesRepository.save(newInfluencerProfile);
    }

    async startVerifyingProfile(influencerProfileId: string) {
        const influencerProfile = await this.influencerProfilesRepository.getOneById(influencerProfileId);
        if(influencerProfile.verifyStatus === VerifyStatus.COMPLETE) throw new BadRequestException();
        const verifyCode = generateRandomStr(6);
        await this.cacheManager.set(CACHE_KEYS.INFLUENCER_PROFILE_VERIFY_CODE(influencerProfileId), verifyCode, this.VERIFY_EXP_MS);
        influencerProfile.verifyStatus = VerifyStatus.PROCESSING;
        await influencerProfile.save();
        return new VerifyInfoDto(verifyCode, this.VERIFYURL[influencerProfile.platform]);
    }

    async processVerifingYoutubeProfile() {

    }

    async processVerifingInstagramProfile() {

    }



    /******************** */

    // async getVerifyUrl(platform : SocialPlatform) {
    //     if(platform === SocialPlatform.YOUTUBE) {
    //         return this.YOUTUBE_VERIFY_URL;
    //     } else if (platform === SocialPlatform.INSTAGRAM) {
    //         return this.INSTAGRAM_VERIFY_URL;
    //     }
    // }

    // async verifySocialAccount(influencerProfileId: string) {
    //     const influencerProfile = await this.influencerProfilesRepository.getOneById(influencerProfileId);
    //     let comment : Comment = null;
    //     if(influencerProfile.platform === SocialPlatform.YOUTUBE) {
    //         comment = await this.youtubeService.findSocialUserComment(this.YOUTUBE_VERIFY_URL, influencerProfile.tagId);
    //     } else if (influencerProfile.platform === SocialPlatform.INSTAGRAM) {
    //         comment = await this.instagramService.findSocialUserComment(this.INSTAGRAM_VERIFY_URL, influencerProfile.tagId);
    //     }
    //     if(!comment) throw new BadRequestException("인증 실패");
    //     await this.influencerProfilesRepository.update(influencerProfileId, {
    //         verifyStatus : VerifyStatus.COMPLETE,
    //     });
    // }



}
