import { Injectable } from "@nestjs/common";
import { SocialPlatformService } from "./interfaces/social-platform-service.interface";
import { youtube_v3 } from "@googleapis/youtube";
import { Builder } from "builder-pattern";
import { SocialProfilePayload } from "./interfaces/social-profile-payload.interface";


@Injectable()
export class YoutubeService implements SocialPlatformService {

    readonly API_KEY = process.env['YOUTUBE_API_KEY'];
    private api : youtube_v3.Youtube;

    constructor() {
        this.api = new youtube_v3.Youtube({
            auth : this.API_KEY,
            apiVersion : "v3"
        });
    }

    async findProfileByTagId(tagId:string) : Promise<SocialProfilePayload> {
        tagId = "@" + tagId.replace("@", "");
        const {data} = await this.api.channels.list({
            part : ["snippet", "statistics"],
            forHandle : tagId
        });
        const item = data?.items?.[0];
        if(!item) return null;
        const socialProfile = Builder<SocialProfilePayload>()
        .tagId(tagId)
        .bio(item.snippet.description)
        .img(item.snippet.thumbnails.default.url)
        .followerCnt(Number(item.statistics.subscriberCount))
        .build();
        return socialProfile;
    }

    // async findProfileById() {

    // }

}