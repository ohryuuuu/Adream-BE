import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetApplicationsFilterDto  {

    @IsOptional()
    @IsNumber()
    recruitmentId: number;

    @IsOptional()
    @IsString()
    influencerProfileId : string;

}