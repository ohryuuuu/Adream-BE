import { IsNumber, IsString, IsUUID } from "class-validator";

export class ApplicationDto {


    @IsUUID()
    influencerProfileId:string;

    @IsNumber()
    recruitmentId : number;

    @IsString()
    appeal: string;

    

}