import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

@Expose()
export class AddInfluencerCategoryDto {

    @Exclude()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Exclude()
    @IsNotEmpty()
    @IsUrl()
    img: string;

    @Exclude()
    @IsNotEmpty()
    @IsString()
    description: string;
}