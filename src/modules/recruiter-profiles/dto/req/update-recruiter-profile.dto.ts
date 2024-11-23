import { IsString } from "class-validator";
import { BusinessInfoDto } from "./business-info.dto";

export class UpdateRecruiterProfileDto extends BusinessInfoDto {

    @IsString()
    contactEmail: string;

    @IsString()
    proofWay: string;

    @IsString()
    proofImg: string;


}