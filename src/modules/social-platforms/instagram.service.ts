import { Injectable } from "@nestjs/common";
import { SocialPlatformService, SocialProfile } from "./constant/social-platform-service.interface";


@Injectable()
export class InstagramService implements SocialPlatformService {

    readonly API_KEY = "";


    async findProfileByTagId(tagId:string) : Promise<SocialProfile> {
        return new SocialProfile();
    }
}