import { Injectable } from '@nestjs/common';
import { RecruiterProfilesRepository } from './recruiter-profiles.repository';
import { RecruiterProfile } from './recruiter-profile.entity';
import { AddRecruiterProfileDto } from './dto/req/add-recruiter-profile.dto';
import { Transactional } from 'typeorm-transactional';
import { UsersRepository } from '../users/users.repository';
import { Builder } from 'builder-pattern';
import { UpdateRecruiterProfileDto } from './dto/req/update-recruiter-profile.dto';
import { User } from '../users/user.entity';
import { NotOwnProfileException } from './exceptions/not-own-profile.exception';
import { NotWorkingBusinessException } from './exceptions/not-working-business.exception';
import { IsBusinessWorkingDto } from './dto/req/is-business-working.dto';

@Injectable()
export class RecruiterProfilesService {

    constructor(
        private recruiterProfilesRepository : RecruiterProfilesRepository,
        private usersRepository: UsersRepository,
    ) {}

    private readonly ExpirationTermDays = 365;

    async getMyRecruiterProfiles(userId: string) : Promise<RecruiterProfile[]> {
        return await this.recruiterProfilesRepository.findByUserId(userId);
    }

    @Transactional()
    async addMyRecruiterProfile(userId: string, addDto: AddRecruiterProfileDto) {
        await this.checkBusinessWorking({businessNumber : addDto.businessNumber, businessName : addDto.businessName, representativeName: addDto.representativeName});
        const user = await this.usersRepository.getOneById(userId);
        const expirationDate = this.getExpirationDate();
        const newRecruiterProfile = Builder<RecruiterProfile>(RecruiterProfile)
        .businessNumber(addDto.businessNumber)
        .businessName(addDto.businessName)
        .businessType(addDto.businessType)
        .contactEmail(addDto.contactEmail)
        .proofImg(addDto.proofImg)
        .proofWay(addDto.proofWay)
        .expirationAt(expirationDate)
        .user(user)
        .build();
        await newRecruiterProfile.save();
    }

    @Transactional()
    async updateMyRecruiterProfile(userId: string, profileId: string, updateDto: UpdateRecruiterProfileDto) {
        const user = await this.usersRepository.getOneById(userId);
        const profile = await this.recruiterProfilesRepository.getOneById(profileId);
        await this.checkOwnProfile(user, profile);
        await this.checkBusinessWorking({businessNumber : profile.businessNumber, businessName : updateDto.businessName, representativeName: updateDto.representativeName});
        profile.contactEmail = updateDto.contactEmail;
        profile.businessType = updateDto.businessType;
        profile.businessName = updateDto.businessName;
        profile.proofImg = updateDto.proofImg;
        profile.proofWay = updateDto.proofWay;
        profile.expirationAt = this.getExpirationDate();
        await profile.save();
    }

    @Transactional()
    async deleteMyRecruiterProfile(userId: string, profileId: string) {
        const user = await this.usersRepository.findOneById(userId);
        const profile = await this.recruiterProfilesRepository.getOneById(profileId);
        await this.checkOwnProfile(user, profile);
        await profile.softRemove();
    }

    async isBusinessWorking(isBusinessWorkingDto : IsBusinessWorkingDto) {
        //1. 국세청에서 데이터 조회
        //2. 운영중인지 체크
        //3. 운영여부 반환
        return true;
    }


    private async checkOwnProfile(user: User, profile : RecruiterProfile) : Promise<void> {
        const userId = (await profile?.user)?.id;
        if(user.id !== userId) throw new NotOwnProfileException();
    }

    private async checkBusinessWorking(isBusinessWorkingDto : IsBusinessWorkingDto) {
        const isWorking = await this.isBusinessWorking(isBusinessWorkingDto);
        if(!isWorking) throw new NotWorkingBusinessException();
    }

    private getExpirationDate() : Date {
        const today = new Date();
        const oneYearInMilliseconds = this.ExpirationTermDays * 24 * 36000;
        const expirationDate = new Date(today.getTime() + oneYearInMilliseconds);
        return expirationDate;
    }

}
