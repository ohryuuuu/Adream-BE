import { Module } from '@nestjs/common';
import { RecruitmentsController } from './recruitments.controller';
import { TypeOrmExModule } from 'src/config/typeorm/typeorm-ex.module';
import { UsersRepository } from '../users/users.repository';
import { RecruitmentsRepository } from './recruitments.repository';
import { RecruiterProfilesRepository } from '../recruiter-profiles/recruiter-profiles.repository';
import { RecruiterProfilesService } from '../recruiter-profiles/recruiter-profiles.service';
import { RecruiterProfilesModule } from '../recruiter-profiles/recruiter-profiles.module';

@Module({
  imports : [TypeOrmExModule.forCustomRepository([UsersRepository, RecruiterProfilesRepository, RecruitmentsRepository]), RecruiterProfilesModule],
  providers: [RecruiterProfilesService],
  controllers: [RecruitmentsController],
})
export class RecruitmentsModule {}
