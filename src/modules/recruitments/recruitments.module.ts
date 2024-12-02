import { Module } from '@nestjs/common';
import { RecruitmentsController } from './recruitments.controller';
import { TypeOrmExModule } from 'src/config/typeorm/typeorm-ex.module';
import { RecruitmentsRepository } from './recruitments.repository';
import { RecruiterProfilesRepository } from '../recruiter-profiles/recruiter-profiles.repository';
import { RecruitmentsService } from './recruitments.service';
import { InfluencerCategoriesRepository } from '../influencer-categories/influencer-categories.repository';

@Module({
  imports : [
    TypeOrmExModule.forCustomRepository([RecruiterProfilesRepository, RecruitmentsRepository, InfluencerCategoriesRepository,])],
  providers: [RecruitmentsService],
  controllers: [RecruitmentsController],
})
export class RecruitmentsModule {}
