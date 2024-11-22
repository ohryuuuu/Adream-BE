import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/req/sign-up.dto";
import { SignInDto } from "./dto/req/sign-in.dto";
import { Response } from "express";

@Controller('auth')
export class AuthController {

    constructor(
        private authService : AuthService,
    ) {}

    readonly accessTokenKeyname = "access_token";

    @Post("sign_up")
    async signUp(@Body() signUpDto: SignUpDto) {
        return await this.authService.signUp(signUpDto);
    }

    @Post("sign_in")
    async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
        const accessToken = await this.authService.signIn(signInDto);
        res.cookie(this.accessTokenKeyname, accessToken);
        return res.send();
    }

    @Post("is_email_available")
    async isEmailAvailable(@Body('email') email: string) {
        return await this.authService.isEmailAvailable(email);
    }

}