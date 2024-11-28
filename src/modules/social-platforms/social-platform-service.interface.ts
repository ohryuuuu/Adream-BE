export class Comment {
    tagId:string;
    content : string;
}

export class SocialUser {
    tagId:string;
    img: string;
}

export interface SocialPlatformService {
    readonly API_KEY : string;
    findSocialUserComment(contentUrl:string, tagId:string) : Promise<Comment>;
    findSocialUserInfo(tagId:string) : Promise<SocialUser>;
}
