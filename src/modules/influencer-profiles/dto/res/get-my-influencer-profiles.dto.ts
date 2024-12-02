import { InfluencerCategory } from "src/modules/influencer-categories/influencer-category.entity";
import { InfluencerProfile } from "../../influencer-profile.entity";
import { VerifyStatus } from "../../enums/verify-status.enum";
import { SocialPlatform } from "src/modules/social-platforms/enums/social-platform.enum";

export class GetMyInfluencerProfilesItemDto {
    
    id: string;
    tagId: string;
    followerCnt: number;
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
        this.categories = influencerProfile.categories
    }

}