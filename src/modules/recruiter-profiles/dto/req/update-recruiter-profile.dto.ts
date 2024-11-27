import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { BusinessDto } from "./business.dto";
import { ProofDto } from "./proof.dto";

export class UpdateRecruiterProfileDto {

    @IsNotEmpty()
    @ValidateNested()
    business: BusinessDto;

    @IsNotEmpty()
    @ValidateNested()
    proofDto : ProofDto;

    @IsString()
    contactEmail: string;



}