import { Injectable } from '@nestjs/common';
import { RecruiterProfilesRepository } from './recruiter-profiles.repository';
import { RecruiterProfile } from './recruiter-profile.entity';
import { AddRecruiterProfileDto } from './dto/req/add-recruiter-profile.dto';
import { Transactional } from 'typeorm-transactional';
import { UsersRepository } from '../users/users.repository';
import { UpdateRecruiterProfileDto } from './dto/req/update-recruiter-profile.dto';
import { NationalTaxService } from './national-tax.service';
import { BusinessNumIsNotSameException } from './exceptions/business-num-is-not-same.exception';
import { generateExpirationDate } from 'src/common/utils/date';

@Injectable()
export class RecruiterProfilesService {

    constructor(
        private recruiterProfilesRepository : RecruiterProfilesRepository,
        private usersRepository: UsersRepository,
        private nationalTaxService : NationalTaxService,
    ) {}

    private readonly ExpirationTermDays = 365;

    @Transactional()
    async getMyRecruiterProfiles(userId: string) : Promise<RecruiterProfile[]> {
        return await this.recruiterProfilesRepository.findByUserId(userId);
    }

    @Transactional()
    async addMyRecruiterProfile(userId: string, addDto: AddRecruiterProfileDto) : Promise<void> {
        const user = await this.usersRepository.getOneById(userId);
        const expirationAt = generateExpirationDate(this.ExpirationTermDays);
        const newRecruiterProfile = this.recruiterProfilesRepository.create({
            business: addDto.business,
            proof: addDto.proof,
            contactEmail: addDto.contactEmail, 
            user,
            expirationAt 
        });
        await this.recruiterProfilesRepository.save(newRecruiterProfile);
        await this.nationalTaxService.checkBusinessWorking(addDto.business);
    }

    @Transactional()
    async updateMyRecruiterProfile(userId: string, profileId: string, updateDto: UpdateRecruiterProfileDto) : Promise<void> {
        const profile = await this.recruiterProfilesRepository.getOneById(profileId);
        await profile.checkOwnProfile(userId);
        const expirationAt = generateExpirationDate(this.ExpirationTermDays);
        if(updateDto.business.number !== profile.business.number) throw new BusinessNumIsNotSameException();
        await this.recruiterProfilesRepository.update(profileId, {
            business : updateDto.business,
            contactEmail : updateDto.contactEmail,
            proof : updateDto.proof,
            expirationAt
        })
        await this.nationalTaxService.checkBusinessWorking(updateDto.business);
    }

    @Transactional()
    async deleteMyRecruiterProfile(userId: string, profileId: string) : Promise<void> {
        const user = await this.usersRepository.findOneById(userId);
        const profile = await this.recruiterProfilesRepository.getOneById(profileId);
        await profile.checkOwnProfile(user.id);
        await this.recruiterProfilesRepository.softRemove(profile);
    }


}
