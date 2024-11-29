import { Module } from '@nestjs/common';
import { RecruiterProfilesController } from './recruiter-profiles.controller';
import { RecruiterProfilesService } from './recruiter-profiles.service';
import { TypeOrmExModule } from 'src/config/typeorm/typeorm-ex.module';
import { RecruiterProfilesRepository } from './recruiter-profiles.repository';
import { UsersRepository } from '../users/users.repository';
import { HttpModule } from '@nestjs/axios';
import { NationalTaxService } from './national-tax.service';

@Module({
  imports: [HttpModule, TypeOrmExModule.forCustomRepository([UsersRepository, RecruiterProfilesRepository])],
  controllers: [RecruiterProfilesController],
  providers: [RecruiterProfilesService, NationalTaxService],
  exports : [RecruiterProfilesService, NationalTaxService]
})
export class RecruiterProfilesModule {}
