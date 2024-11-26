import { IsNotEmpty, IsString, IsUrl, ValidateNested } from "class-validator";
import { BusinessDto } from "./business.dto";

export class AddRecruiterProfileDto {

    @IsNotEmpty()
    @ValidateNested()
    business: BusinessDto;
    
    @IsNotEmpty()
    @IsString()
    contactEmail: string;

    @IsNotEmpty()
    @IsString()
    proofWay: string; //신분증(대표의경우), 재직증명서(직원의경우)

    @IsNotEmpty()
    @IsUrl()
    proofImg: string; //증명서가 찍힌 사진 이미지

}