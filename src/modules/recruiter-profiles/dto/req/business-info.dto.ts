import { IsDate, IsDateString, IsEnum, IsNumberString, IsString, Length } from "class-validator";
import { BusinessType } from "../../constants/business-type.enum";

export class BusinessInfoDto {
    @IsString()
    businessNumber: string;

    @IsString()
    businessName: string;

    @Length(8)
    @IsNumberString()
    businessStartDate: string; //yyyymmdd

    @IsString()
    representativeName: string;

    @IsString()
    @IsEnum(BusinessType)
    businessType: BusinessType;
}