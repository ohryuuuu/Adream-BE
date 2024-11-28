import { Injectable } from "@nestjs/common";
import { Comment, SocialPlatformService, SocialUser } from "./social-platform-service.interface";


@Injectable()
export class InstagramService implements SocialPlatformService {

    readonly API_KEY = "";

    async findSocialUserComment(contentUrl:string, tagId:string) : Promise<Comment> {

        return null;
    }


    async findSocialUserInfo(tagId:string) : Promise<SocialUser> {
        return new SocialUser();
    }
}