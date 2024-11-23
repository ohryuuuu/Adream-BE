import { IsString, IsUrl } from "class-validator";
import { BusinessType } from "../../constants/business-type.enum";

export class AddRecruiterProfileDto {
    
    @IsString()
    contactEmail: string;

    @IsString()
    businessNumber: string; //사업자등록번호

    @IsString()
    businessType: BusinessType; //개인, 법인

    @IsString()
    businessName: string; //상호명

    @IsString()
    representativeName : string; //대표자명

    @IsString()
    proofWay: string; //신분증(대표의경우), 재직증명서(직원의경우)

    @IsUrl()
    proofImg: string; //증명서가 찍힌 사진 이미지

}