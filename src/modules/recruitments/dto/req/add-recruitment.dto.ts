import { IsDate, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { SupportMethod } from "../../constants/support-method.enum";
import { PriceRange } from "../../constants/price-range.enum";

export class AddRecruitmentDto {

    @IsUUID()
    recruiterProfileId: string;

    @IsString()
    title: string;

    @IsString()
    description : string;

    @IsEnum(SupportMethod)
    supportMethodA: SupportMethod;

    @IsOptional()
    @IsEnum(SupportMethod)
    supportMethodB: SupportMethod;

    @IsOptional()
    @IsEnum(PriceRange)
    priceRangeType: PriceRange;

    @IsOptional()
    @IsNumber()
    price: number;

    @IsDate()
    deadline: Date;

}