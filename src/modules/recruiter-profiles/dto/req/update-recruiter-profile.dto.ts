import { IsString, ValidateNested } from "class-validator";
import { BusinessDto } from "./business.dto";

export class UpdateRecruiterProfileDto {

    @ValidateNested()
    business: BusinessDto;

    @IsString()
    contactEmail: string;

    @IsString()
    proofWay: string;

    @IsString()
    proofImg: string;


}