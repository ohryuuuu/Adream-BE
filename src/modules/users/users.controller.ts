import { Body, Controller, Delete, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt_auth.guard';
import { GetUserId } from '../auth/decorators/get-user-id.decorator';
import { UsersService } from './users.service';
import { Response } from 'express';
import { InfluencerProfilesService } from '../influencer-profiles/influencer-profiles.service';
import { RecruiterProfilesService } from '../recruiter-profiles/recruiter-profiles.service';
import { RegisterUserDto } from './dto/req/register-user.dto';

@Controller('users')
export class UsersController {

    constructor(
        private usersService : UsersService,
        private influencerProfilesService: InfluencerProfilesService,
        private recruiterProfilesService : RecruiterProfilesService,
    ) {}


    @Post()
    async registerUser(@Body() registerUserDto: RegisterUserDto) {
        return await this.usersService.registerUser(registerUserDto);
    }

    @Get('is-email-unique')
    async getEmailExists(@Query('email') email:string) {
        return await this.usersService.isEmailUnique(email);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@GetUserId() userId : string) {
        return await this.usersService.getUser(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me/recruiter_profiles')
    async getMyRecruiterProfiles(@GetUserId() userId : string) {
        return await this.recruiterProfilesService.getMyRecruiterProfiles(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get("me/influencer_profiles")
    async getMyInfluencerProfiles(@GetUserId() userId: string) {
        return await this.influencerProfilesService.getMyInfluencerProfiles(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('me')
    async deleteMe(@GetUserId() userId : string, @Res() res : Response) {
        await this.usersService.deleteUser(res, userId);
    }



}
