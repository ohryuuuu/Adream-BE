import { Injectable, OnModuleInit } from "@nestjs/common";
import { SocialPlatformService } from "./interfaces/social-platform-service.interface";
import { SocialProfilePayload } from "./interfaces/social-profile-payload.interface";
import { Builder } from "builder-pattern";
import { getCookie, igApi } from "insta-fetcher"; 

@Injectable()
export class InstagramService implements SocialPlatformService, OnModuleInit {

    private api : igApi;

    async onModuleInit() {
        const session_id = await getCookie(process.env['INSTAGRAM_USERNAME'], process.env['INSTAGRAM_PASSWORD']);
        this.api = new igApi(session_id as string);
    }

    async findProfileByTagId(tagId:string) : Promise<SocialProfilePayload> {
        try {
            const user = await this.api.fetchUserV2(tagId);
            if(!user) return null;
            const socialProfilePayload = Builder<SocialProfilePayload>()
            .bio(user.biography)
            .img(user.profile_pic_url)
            .followerCnt(user.edge_follow.count as number)
            .tagId(tagId)
            .build();
            return socialProfilePayload;
        } catch(e) {
            if(e.response.status === 401) {
                await this.onModuleInit();
                return await this.findProfileByTagId(tagId);
            }
        }
       
    }
}