import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { TypeOrmExModule } from 'src/config/typeorm/typeorm-ex.module';
import { ApplicationsRepository } from './applications.repository';
import { InfluencerProfilesRepository } from '../influencer-profiles/influencer-profiles.repository';
import { RecruitmentsRepository } from '../recruitments/recruitments.repository';

@Module({
  imports : [TypeOrmExModule.forCustomRepository([ApplicationsRepository,RecruitmentsRepository,InfluencerProfilesRepository])],
  providers: [ApplicationsService],
  controllers: [ApplicationsController]
})
export class ApplicationsModule {}
