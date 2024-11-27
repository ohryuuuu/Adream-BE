import { Module } from '@nestjs/common';
import { InfluencerProfilesController } from './influencer-profiles.controller';
import { InfluencerProfilesService } from './influencer-profiles.service';
import { TypeOrmExModule } from 'src/config/typeorm/typeorm-ex.module';
import { InfluencerProfileRepository } from './influencer-profiles.repository';
import { UsersRepository } from '../users/users.repository';
import { InfluencerCategoriesRepository } from '../influencer-categories/influencer-categories.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([InfluencerProfileRepository, UsersRepository, InfluencerCategoriesRepository])],
  controllers: [InfluencerProfilesController],
  providers: [InfluencerProfilesService]
})
export class InfluencerProfilesModule {}

