import { Transactional } from "typeorm-transactional";
import { UserRepository } from "../users/user.repository";
import { SignUpDto } from "./dto/req/sign-up.dto";
import * as crypto from 'crypto';
import { Builder } from "builder-pattern";
import { User } from "../users/user.entity";
import { EmailAlreadyExistsException } from "./exceptions/email-already-exsist.exception";
import { NotSamePasswordException } from "./exceptions/not-same-password.exception"
import { JwtPayload } from "./payload/jwt.payload";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "./dto/req/sign-in.dto";
import { Injectable } from "@nestjs/common";


@Injectable()
export class AuthService {

    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    @Transactional()
    async signUp(signUpDto : SignUpDto) : Promise<void> {
        const sameEmail = await this.userRepository.findOneByEmail(signUpDto.email);
        if(sameEmail) throw new EmailAlreadyExistsException();
        const hashedPassword = this.hashPassword(signUpDto.password);
        const newUser = Builder(User)
        .email(signUpDto.email)
        .password(hashedPassword)
        .name(signUpDto.name)
        .build();
        await newUser.save();
    }

    @Transactional()
    async signIn(signInDto : SignInDto) : Promise<string> {
        const user = await this.userRepository.getOneByEmail(signInDto.email);
        const isSamePass = this.comparePasswords(signInDto.password, user.password);
        if(!isSamePass) throw new NotSamePasswordException();
        const payload = Builder<JwtPayload>()
        .id(user.id)
        .email(user.email)
        .name(user.name)
        .type(user.type)
        .build()
        const token = this.jwtService.sign(payload);
        return token;
    }

    async isEmailAvailable(email:string) : Promise<boolean> {
        const user = await this.userRepository.findOneByEmail(email);
        return !user;
    }


    private hashPassword(password: string): string {
        const hash = crypto.createHmac('sha256', 'secretKey')
        .update(password)
        .digest('hex');
        return hash;
    }
    
    private comparePasswords(password: string, storedPasswordHash: string): boolean {
        const hash = this.hashPassword(password);
        return hash === storedPasswordHash;
    }

}