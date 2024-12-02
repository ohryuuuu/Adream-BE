import { IsEnum, IsOptional, IsString } from "class-validator";
import { ReviewStatus } from "../../enums/review-status.enum";

export class ReviewRecruitmentDto {

    @IsEnum(ReviewStatus)
    status: ReviewStatus;

    @IsOptional()
    @IsString()
    content: string;

}