import { Module } from '@nestjs/common';
import { RecruitmentsController } from './recruitments.controller';
import { TypeOrmExModule } from 'src/config/typeorm/typeorm-ex.module';
import { RecruitmentsRepository } from './recruitments.repository';
import { RecruiterProfilesRepository } from '../recruiter-profiles/recruiter-profiles.repository';
import { RecruitmentsService } from './recruitments.service';

@Module({
  imports : [
    TypeOrmExModule.forCustomRepository([RecruiterProfilesRepository, RecruitmentsRepository])],
  providers: [RecruitmentsService],
  controllers: [RecruitmentsController],
})
export class RecruitmentsModule {}
