import { IsEnum, IsNotEmpty, IsNumberString, IsString, Length } from "class-validator";
import { BusinessType } from "../../enums/business-type.enum";

export class BusinessDto {

    @IsNotEmpty()
    @IsString()
    number: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @Length(8)
    @IsNumberString()
    startDate: string; //yyyymmdd

    @IsNotEmpty()
    @IsString()
    representativeName: string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(BusinessType)
    type: BusinessType;
    
}