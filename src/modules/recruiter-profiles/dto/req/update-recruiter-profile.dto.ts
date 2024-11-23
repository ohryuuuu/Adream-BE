import { IsString } from "class-validator";
import { BusinessType } from "../../constants/business-type.enum";

export class UpdateRecruiterProfileDto {

    @IsString()
    contactEmail: string;

    @IsString()
    proofWay: string;

    @IsString()
    proofImg: string;

    @IsString()
    businessType: BusinessType; //개인, 법인

    @IsString()
    representativeName : string; //대표자명

    @IsString()
    businessStartDate: string;

    @IsString()
    businessName: string; //상호명

}