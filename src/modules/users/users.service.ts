import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Builder } from 'builder-pattern';
import { GetMeDto } from './dto/res/get-me.dto';
import { Transactional } from 'typeorm-transactional';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';

@Injectable()
export class UsersService {

    @Inject()
    private usersRepository : UsersRepository;

    @Inject()
    private authService : AuthService;

    async getMe(userId: string) : Promise<GetMeDto> {
        const user = await this.usersRepository.getOneById(userId);
        const getMeDto = Builder<GetMeDto>()
        .id(user.id)
        .name(user.name)
        .type(user.type)
        .createdAt(user.createdAt)
        .build();
        return getMeDto;
    }

    @Transactional()
    async deleteMe(res:Response, userId: string) : Promise<void> {
        const user = await this.usersRepository.getOneById(userId);
        await user.softRemove();
        await this.authService.signOut(res);
    }

    
    
}
