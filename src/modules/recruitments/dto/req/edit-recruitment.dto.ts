import { Exclude } from "class-transformer";
import { AddRecruitmentDto } from "./add-recruitment.dto";
import { IsEmpty } from "class-validator";

export class EditRecruitmentDto extends AddRecruitmentDto {


    @Exclude()
    @IsEmpty()
    recruiterProfileId: string;


}