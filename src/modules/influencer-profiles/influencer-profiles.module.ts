import { Module } from '@nestjs/common';
import { InfluencerProfilesController } from './influencer-profiles.controller';
import { InfluencerProfilesService } from './influencer-profiles.service';
import { TypeOrmExModule } from 'src/config/typeorm/typeorm-ex.module';
import { InfluencerProfilesRepository } from './influencer-profiles.repository';
import { UsersRepository } from '../users/users.repository';
import { InfluencerCategoriesRepository } from '../influencer-categories/influencer-categories.repository';
import { CacheModule } from '@nestjs/cache-manager';
import { SocialPlatformsModule } from 'src/modules/social-platforms/social-platforms.module';

@Module({
  imports: [SocialPlatformsModule, CacheModule.register(), TypeOrmExModule.forCustomRepository([InfluencerProfilesRepository, UsersRepository, InfluencerCategoriesRepository])],
  controllers: [InfluencerProfilesController],
  providers: [InfluencerProfilesService],
  exports : [InfluencerProfilesService]
})
export class InfluencerProfilesModule {}