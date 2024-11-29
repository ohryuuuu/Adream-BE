import { SocialProfilePayload } from "./social-profile-payload.interface";

export interface SocialPlatformService {
    readonly API_KEY : string;
    findProfileByTagId(tagId:string) : Promise<SocialProfilePayload>;
}
