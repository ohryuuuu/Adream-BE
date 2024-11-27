import { Exclude, Expose } from "class-transformer";
import { SocialPlatform } from "../../constants/social-platform.enum";

@Exclude()
export class AddMyInfluencerProfileDto {

    @Expose()
    tagId: string;

    @Expose()
    followerCnt: string;

    @Expose()
    platform: SocialPlatform;

    @Expose()
    contactEmail: string;

    @Expose()
    categoryIds: string[];

}