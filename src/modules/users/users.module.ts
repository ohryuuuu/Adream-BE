import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmExModule } from 'src/config/typeorm/typeorm-ex.module';
import { UsersRepository } from './users.repository';
import { AuthModule } from '../auth/auth.module';
import { InfluencerProfilesModule } from '../influencer-profiles/influencer-profiles.module';
import { RecruiterProfilesModule } from '../recruiter-profiles/recruiter-profiles.module';


@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UsersRepository]), 
    AuthModule,
    InfluencerProfilesModule,
    RecruiterProfilesModule
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
