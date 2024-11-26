import { Module } from '@nestjs/common';
import { InfluencerCategoriesService } from './influencer-categories.service';
import { InfluencerCategoriesController } from './influencer-categories.controller';
import { TypeOrmExModule } from 'src/config/typeorm/typeorm-ex.module';
import { InfluencerCategoriesRepository } from './influencer-categories.repository';

@Module({
  imports:[TypeOrmExModule.forCustomRepository([InfluencerCategoriesRepository])],
  providers: [InfluencerCategoriesService],
  controllers: [InfluencerCategoriesController]
})
export class InfluencerCategoriesModule {}
