import { InfluencerCategory } from "src/modules/influencer-categories/influencer-category.entity";
import { SocialPlatform } from "../../constants/social-platform.enum";
import { InfluencerProfile } from "../../influencer-profile.entity";
import { VerifyStatus } from "../../constants/verify-status.enum";

export class GetMyInfluencerProfilesItemDto {
    
    id: string;
    tagId: string;
    followerCnt: string;
    platform: SocialPlatform;
    contactEmail: string;
    verifyStatus: VerifyStatus;
    categories: InfluencerCategory[];


    constructor(influencerProfile: InfluencerProfile) {
        this.id = influencerProfile.id;
        this.tagId = influencerProfile.tagId;
        this.platform = influencerProfile.platform;
        this.contactEmail = influencerProfile.contactEmail;
        this.followerCnt = influencerProfile.followerCnt;
        this.verifyStatus = influencerProfile.verifyStatus;
    }

}