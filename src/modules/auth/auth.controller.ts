import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/req/sign-in.dto";
import { Response } from "express";
import { JwtAuthGuard } from "./guards/jwt_auth.guard";


@Controller('auth')
export class AuthController {

    constructor(
        private authService : AuthService,
    ) {}

    static readonly accessTokenKeyname = "access_token";

    @Post("sign_in")
    async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
        return await this.authService.signIn(res, signInDto);
    }

    @Post("sign_out")
    @UseGuards(JwtAuthGuard)
    async signOut(@Res() res: Response) {
        return await this.authService.signOut(res);
    }

}