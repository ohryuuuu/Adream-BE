import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

@Exclude()
export class SignUpDto {

    @Expose()
    @IsEmail()
    email: string;
    
    @Expose()
    @IsString()
    password: string;
    
    @Expose()
    @IsString()
    name: string;

}