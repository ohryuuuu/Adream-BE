import { IsString, IsUrl } from "class-validator";

export class AddInfluencerCategoryDto {
    @IsString()
    name: string;
    @IsUrl()
    img: string;
    @IsString()
    description: string;
}