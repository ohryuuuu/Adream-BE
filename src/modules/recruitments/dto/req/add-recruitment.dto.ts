import {  IsDate, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { SupportMethod } from "../../constants/support-method.enum";
import { PriceRange } from "../../constants/price-range.enum";
import { Exclude, Expose } from "class-transformer";


@Exclude()
export class AddRecruitmentDto {

    @Expose()
    @IsUUID()
    recruiterProfileId: string;

    @Expose()
    @IsString()
    title: string;

    @Expose()
    @IsString()
    description : string;

    @Expose()
    @IsEnum(SupportMethod)
    supportMethodA: SupportMethod;

    @Expose()
    @IsOptional()
    @IsEnum(SupportMethod)
    supportMethodB: SupportMethod;

    @Expose()
    @IsOptional()
    @IsEnum(PriceRange)
    priceRangeType: PriceRange;

    @Expose()
    @IsOptional()
    @IsNumber()
    price: number;

    @Expose()
    @IsDate()
    deadline: Date;

}