import { Controller, Delete, Get, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt_auth.guard';
import { GetUserId } from '../auth/decorators/get-user-id.decorator';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {

    constructor(
        private usersService : UsersService
    ) {}

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getMe(@GetUserId() userId : string) {
        return await this.usersService.getMe(userId);
    }

    @Delete('me')
    @UseGuards(JwtAuthGuard)
    async deleteMe(@GetUserId() userId : string, @Res() res : Response) {
        await this.usersService.deleteMe(res, userId);
    }

}
