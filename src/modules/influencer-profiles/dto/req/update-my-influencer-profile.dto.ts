
import { IsString } from "class-validator";

export class UpdateMyInfluencerProfileDto {

    @IsString()
    contactEmail: string;

    @IsString({
        each:true
    })
    categoryIds: string[];

}