import {  IsDate, IsDateString, IsEnum, IsIn, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { SupportMethod } from "../../constants/support-method.enum";
import { PriceRange } from "../../constants/price-range.enum";
import { ReviewStatus } from "../../constants/review-status.enum";

export class AddRecruitmentDto {


    @IsIn([ReviewStatus.WAITING])
    @IsEnum(ReviewStatus)
    readonly reviewStatus: ReviewStatus = ReviewStatus.WAITING;

    @IsString()
    readonly review: string = "심사를 대기합니다";

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