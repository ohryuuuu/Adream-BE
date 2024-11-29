import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { GetMeDto } from './dto/res/get-me.dto';
import { Transactional } from 'typeorm-transactional';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';

@Injectable()
export class UsersService {

    constructor(    
        private usersRepository : UsersRepository,    
        private authService : AuthService
    ) {}

    async getMe(userId: string) : Promise<GetMeDto> {
        const user = await this.usersRepository.getOneById(userId);
        const getMeDto = new GetMeDto(user);
        return getMeDto;
    }

    @Transactional()
    async deleteMe(res:Response, userId: string) : Promise<void> {
        const user = await this.usersRepository.getOneById(userId);
        await this.usersRepository.softRemove(user);
        await this.authService.signOut(res);
    }

    
    
}
