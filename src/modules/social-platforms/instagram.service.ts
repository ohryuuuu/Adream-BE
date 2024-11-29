import { Injectable } from "@nestjs/common";
import { SocialPlatformService } from "./interfaces/social-platform-service.interface";
import { SocialProfilePayload } from "./interfaces/social-profile-payload.interface";
import { Builder } from "builder-pattern";
import { igApi } from "insta-fetcher"; 

@Injectable()
export class InstagramService implements SocialPlatformService {

    readonly API_KEY = process.env['INSTAGRAM_API_KEY'];
    private api : igApi;

    constructor() {
        this.api = new igApi(this.API_KEY);
    }

    async findProfileByTagId(tagId:string) : Promise<SocialProfilePayload> {
        const user = await this.api.fetchUserV2(tagId);
        if(!user) return null;
        const socialProfilePayload = Builder<SocialProfilePayload>()
        .bio(user.biography)
        .img(user.profile_pic_url)
        .followerCnt(user.edge_follow.count as number)
        .tagId(tagId)
        .build();
        return socialProfilePayload;
    }
}