import { Transactional } from "typeorm-transactional";
import { UsersRepository } from "../users/users.repository";
import { Builder } from "builder-pattern";
import { PasswordIsNotCorrectException } from "./exceptions/password-is-not-correct.exception"
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "./dto/req/sign-in.dto";
import { Injectable } from "@nestjs/common";
import { Response } from "express";


@Injectable()
export class AuthService {

    constructor(
        private userRepository: UsersRepository,
        private jwtService: JwtService,
    ) {}


    @Transactional()
    async signIn(res:Response, signInDto:SignInDto) : Promise<void> {
        const user = await this.userRepository.getOneByEmail(signInDto.email);
        const isSamePass = user.isPasswordCorrect(signInDto.password);
        if(!isSamePass) throw new PasswordIsNotCorrectException();
        const payload = Builder<JwtPayload>()
        .id(user.id)
        .email(user.email)
        .name(user.name)
        .type(user.type)
        .build();
        const accessToken = this.jwtService.sign(payload);
        this.setAccessToken(res, accessToken);
    }

    async signOut(res : Response) : Promise<void> {
        await this.clearAccessToken(res);
    }

    async setAccessToken(res:Response, accessToken:string) : Promise<void> {
        res.cookie("access_token", accessToken).send();
    }

    async clearAccessToken(res:Response) : Promise<void> {
        res.clearCookie("access_token").send();
    }

}