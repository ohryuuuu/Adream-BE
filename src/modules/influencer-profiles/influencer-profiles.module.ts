import { Module } from '@nestjs/common';
import { InfluencerProfilesController } from './influencer-profiles.controller';
import { InfluencerProfilesService } from './influencer-profiles.service';

@Module({
  imports: [],
  controllers: [InfluencerProfilesController],
  providers: [InfluencerProfilesService]
})
export class InfluencerProfilesModule {}

