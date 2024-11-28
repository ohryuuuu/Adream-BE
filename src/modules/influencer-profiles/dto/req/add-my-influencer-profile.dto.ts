import { SocialPlatform } from "../../constants/social-platform.enum";
import { IsArray, IsEnum, IsString, Max, Min } from "class-validator";

export class AddMyInfluencerProfileDto {

    @IsString()
    tagId: string;

    @IsEnum(SocialPlatform)
    platform: SocialPlatform;

    @IsString()
    contactEmail: string;

    @IsString({
        each:true
    })
    categoryIds: string[];

}