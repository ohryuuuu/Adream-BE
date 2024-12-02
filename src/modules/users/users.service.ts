import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { GetUserDto } from './dto/res/get-user.dto';
import { Transactional } from 'typeorm-transactional';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';
import { EmailAlreadyExistsException } from './exceptions/email-already-exsists.exception';
import { RegisterUserDto } from './dto/req/register-user.dto';

@Injectable()
export class UsersService {

    constructor(    
        private usersRepository : UsersRepository,    
        private authService : AuthService
    ) {}

    @Transactional()
    async registerUser(registerUserDto : RegisterUserDto) : Promise<void> {
        const emailCanBeRegister = await this.isEmailUnique(registerUserDto.email);
        if(!emailCanBeRegister) throw new EmailAlreadyExistsException();
        const newUser = this.usersRepository.create({
            email: registerUserDto.email,
            name: registerUserDto.name
        });
        newUser.setPassword(registerUserDto.password);
        await this.usersRepository.save(newUser);
    }

    @Transactional()
    async getUser(userId: string) : Promise<GetUserDto> {
        const user = await this.usersRepository.getOneById(userId);
        const getMeDto = new GetUserDto(user);
        return getMeDto;
    }

    @Transactional()
    async deleteUser(res:Response, userId: string) : Promise<void> {
        const user = await this.usersRepository.getOneById(userId);
        await this.usersRepository.softRemove(user);
        await this.authService.signOut(res);
    }
    
    @Transactional()
    async isEmailUnique(email:string) : Promise<boolean> {
        const user = await this.usersRepository.findOneByEmail(email);
        return !user;
    }
    
}
