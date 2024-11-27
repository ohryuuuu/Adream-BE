import { IsEnum, IsString } from "class-validator"
import { SocialPlatform } from "../../constants/social-platform.enum"

export class GetVerifyCodeDto {
    @IsEnum(SocialPlatform)
    platform : SocialPlatform;
    
    @IsString()
    tagId : string
}