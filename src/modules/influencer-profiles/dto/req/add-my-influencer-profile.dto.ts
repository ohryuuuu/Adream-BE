
import {  IsEnum, IsString } from "class-validator";
import { SocialPlatform } from "src/modules/social-platforms/constant/social-platform.enum";

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