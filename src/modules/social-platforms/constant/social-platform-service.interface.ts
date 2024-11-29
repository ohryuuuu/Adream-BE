
export class SocialProfile {
    tagId:string;
    img: string;
    bio: string;
    followerCnt: number;
}

export interface SocialPlatformService {
    readonly API_KEY : string;
    findProfileByTagId(tagId:string) : Promise<SocialProfile>;
}
