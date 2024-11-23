import { Module } from '@nestjs/common';
import { RecruitmentsController } from './recruitments.controller';
import { TypeOrmExModule } from 'src/config/typeorm/typeorm-ex.module';
import { UsersRepository } from '../users/users.repository';
import { RecruitmentsRepository } from './recruitments.repository';
import { RecruiterProfilesRepository } from '../recruiter-profiles/recruiter-profiles.repository';
import { RecruiterProfilesModule } from '../recruiter-profiles/recruiter-profiles.module';
import { RecruitmentsService } from './recruitments.service';

@Module({
  imports : [TypeOrmExModule.forCustomRepository([UsersRepository, RecruiterProfilesRepository, RecruitmentsRepository]), RecruiterProfilesModule],
  providers: [RecruitmentsService],
  controllers: [RecruitmentsController],
})
export class RecruitmentsModule {}
