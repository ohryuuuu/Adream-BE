import { Injectable, NotFoundException } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { InstagramService } from './instagram.service';
import { SocialPlatform } from './constant/social-platform.enum';
import { SocialProfile } from './constant/social-platform-service.interface';

@Injectable()
export class SocialPlatformsService {
    constructor(
        private youtubeService : YoutubeService,
        private instagramService : InstagramService,
    ) {}


    async getSocialProfiileByTagId(platform:SocialPlatform, tagId:string) {
        let socialProfile: SocialProfile = null;
        if(platform === SocialPlatform.YOUTUBE) {
            socialProfile = await this.youtubeService.findProfileByTagId(tagId);
        } else if(platform === SocialPlatform.INSTAGRAM) {
            socialProfile = null;
        }
        if(!socialProfile) throw new NotFoundException("소셜 프로필을 찾을 수 없습니다.");
        return socialProfile;
    }


}
