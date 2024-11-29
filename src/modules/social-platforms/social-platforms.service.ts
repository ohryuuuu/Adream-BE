import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { InstagramService } from './instagram.service';
import { SocialPlatform } from './constant/social-platform.enum';
import { SocialProfilePayload } from './interfaces/social-profile-payload.interface';

@Injectable()
export class SocialPlatformsService {
    constructor(
        private youtubeService : YoutubeService,
        private instagramService : InstagramService,
    ) {}


    async getSocialProfiileByTagId(platform:SocialPlatform, tagId:string) : Promise<SocialProfilePayload> {
        let socialProfile: SocialProfilePayload = null;
        if(platform === SocialPlatform.YOUTUBE) {
            socialProfile = await this.youtubeService.findProfileByTagId(tagId);
        } else if(platform === SocialPlatform.INSTAGRAM) {
            throw new BadRequestException("developing...");
            socialProfile = await this.instagramService.findProfileByTagId(tagId);
        }
        if(!socialProfile) throw new NotFoundException("소셜 프로필을 찾을 수 없습니다.");
        return socialProfile;
    }


}


///https://developers.facebook.com/docs/messenger-platform/instagram/features/user-profile