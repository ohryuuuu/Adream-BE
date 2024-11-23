import { IsString, IsUrl } from "class-validator";
import { BusinessInfoDto } from "./business-info.dto";

export class AddRecruiterProfileDto extends BusinessInfoDto {
    
    @IsString()
    contactEmail: string;

    @IsString()
    proofWay: string; //신분증(대표의경우), 재직증명서(직원의경우)

    @IsUrl()
    proofImg: string; //증명서가 찍힌 사진 이미지

}