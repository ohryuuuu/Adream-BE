import { IsString } from "class-validator";

export class IsBusinessWorkingDto {
    @IsString()
    businessNumber: string;
    @IsString()
    businessName: string;
    @IsString()
    representativeName: string;
}