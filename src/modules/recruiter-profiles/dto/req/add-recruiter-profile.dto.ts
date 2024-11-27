import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { BusinessDto } from "./business.dto";
import { ProofDto } from "./proof.dto";


export class AddRecruiterProfileDto {

    @IsNotEmpty()
    @ValidateNested()
    business: BusinessDto;

    @IsNotEmpty()
    @ValidateNested()
    proofDto : ProofDto;
    
    @IsNotEmpty()
    @IsString()
    contactEmail: string;


}