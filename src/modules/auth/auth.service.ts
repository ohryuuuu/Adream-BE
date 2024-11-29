import { Transactional } from "typeorm-transactional";
import { UsersRepository } from "../users/users.repository";
import { SignUpDto } from "./dto/req/sign-up.dto";
import * as crypto from 'crypto';
import { Builder } from "builder-pattern";
import { EmailAlreadyExistsException } from "./exceptions/email-already-exsists.exception";
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
    public async signUp(signUpDto : SignUpDto) : Promise<void> {
        const sameEmail = await this.userRepository.findOneByEmail(signUpDto.email);
        if(sameEmail) throw new EmailAlreadyExistsException();
        const hashedPassword = this.hashPassword(signUpDto.password);
        const newUser = this.userRepository.create({...signUpDto, password: hashedPassword});
        await this.userRepository.save(newUser);
    }

    @Transactional()
    public async signIn(res:Response, signInDto:SignInDto) : Promise<void> {
        const user = await this.userRepository.getOneByEmail(signInDto.email);
        const isSamePass = this.comparePasswords(signInDto.password, user.password);
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

    public async signOut(res : Response) : Promise<void> {
        await this.clearAccessToken(res);
    }

    public async isEmailAvailable(email:string) : Promise<boolean> {
        const user = await this.userRepository.findOneByEmail(email);
        return !user;
    }

    private hashPassword(password: string): string {
        const hash = crypto.createHmac('sha256', process.env['CRYPTO_SECRETKEY'])
        .update(password)
        .digest('hex');
        return hash;
    }
    
    private comparePasswords(password: string, storedPasswordHash: string): boolean {
        const hash = this.hashPassword(password);
        return hash === storedPasswordHash;
    }

    private async setAccessToken(res:Response, accessToken:string) : Promise<void> {
        res.cookie("access_token", accessToken).send();
    }

    private async clearAccessToken(res:Response) : Promise<void> {
        res.clearCookie("access_token").send();
    }

}