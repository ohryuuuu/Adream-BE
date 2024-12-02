import {  IsDate, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { AnotherSupport } from "../../enums/another-support.enum";
import { PriceRange } from "../../enums/price-range.enum";
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
    @IsEnum(AnotherSupport)
    @IsOptional()
    anotherSupport: AnotherSupport;

    @Expose()
    @IsOptional()
    @IsEnum(PriceRange)
    priceRange: PriceRange;

    @Expose()
    @IsOptional()
    @IsNumber()
    price: number;

    @Expose()
    @IsDate()
    deadline: Date;

    @Expose()
    @IsUUID('all', {
        each:true
    })
    preferCategoryIds: string[];

}