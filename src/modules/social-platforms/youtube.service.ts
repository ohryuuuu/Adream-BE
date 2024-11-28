import { Injectable } from "@nestjs/common";
import { Comment, SocialPlatformService, SocialUser } from "./social-platform-service.interface";
import { youtube_v3 } from "@googleapis/youtube";
import * as url from "url";
import { Builder } from "builder-pattern";


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

    async findSocialUserComment(contentUrl:string ,tagId:string, pageToken=null) : Promise<Comment> {
        const urlObj = url.parse(contentUrl, true);
        const videoId = urlObj.query['v'] as string;
        if(!videoId) throw new Error("올바른 유튜브 영상 URL을 보내주세요.");
        const { data } = await this.api.commentThreads.list({
            part : ["snippet"],
            videoId,
            pageToken
        });
        for(let idx in data.items) {
            const item  = data.items[idx];
            const authorDisplayName = item.snippet.topLevelComment.snippet.authorDisplayName;
            const textDisplay = item.snippet.topLevelComment.snippet.textDisplay;
            if(authorDisplayName.replace("@", "") === tagId) {
                const comment = Builder<Comment>(Comment)
                .tagId(tagId)
                .content(textDisplay)
                .build();
                return comment;
            }
        }
        if(!data.nextPageToken) return null;
        return await this.findSocialUserComment(contentUrl, tagId, data.nextPageToken);
    }

    async findSocialUserInfo(tagId:string) : Promise<SocialUser> {

        return new SocialUser();
    }

}