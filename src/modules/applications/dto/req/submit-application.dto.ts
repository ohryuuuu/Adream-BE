import { IsNumber, IsString, IsUUID } from "class-validator";

export class SubmitApplicationDto {

    @IsUUID()
    influencerProfileId:string;

    @IsNumber()
    recruitmentId : number;

    @IsString()
    appeal: string;

}