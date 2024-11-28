import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { BusinessDto } from "./business.dto";
import { ProofDto } from "./proof.dto";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UpdateRecruiterProfileDto {

    @Expose()
    @IsNotEmpty()
    @ValidateNested()
    business: BusinessDto;

    @Expose()
    @IsNotEmpty()
    @ValidateNested()
    proofDto : ProofDto;

    @Expose()
    @IsNotEmpty()
    @IsString()
    contactEmail: string;



}