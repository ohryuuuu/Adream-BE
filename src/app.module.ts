import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmsModule } from './modules/alarms/alarms.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { AuthModule } from './modules/auth/auth.module';
import { FcmTokensModule } from './modules/fcm-tokens/fcm-tokens.module';
import { InfluencerCategoriesModule } from './modules/influencer-categories/influencer-categories.module';
import { InfluencerProfilesModule } from './modules/influencer-profiles/influencer-profiles.module';
import { RecruiterProfilesModule } from './modules/recruiter-profiles/recruiter-profiles.module';
import { RecruitmentsModule } from './modules/recruitments/recruitments.module';
import { UsersModule } from './modules/users/users.module';
import { dbConfig } from './config/db.config';

@Module({
  imports: [
    AlarmsModule,
    ApplicationsModule,
    AuthModule,
    FcmTokensModule,
    InfluencerCategoriesModule,
    InfluencerProfilesModule,
    RecruiterProfilesModule,
    RecruitmentsModule,
    UsersModule,
    TypeOrmModule.forRoot(dbConfig)
  ],
  exports : [TypeOrmModule]
})
export class AppModule {}
