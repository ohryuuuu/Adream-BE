import { Module } from '@nestjs/common';
import { RecruiterProfilesController } from './recruiter-profiles.controller';
import { RecruiterProfilesService } from './recruiter-profiles.service';
import { TypeOrmExModule } from 'src/config/typeorm/typeorm-ex.module';
import { RecruiterProfilesRepository } from './recruiter-profiles.repository';
import { UsersRepository } from '../users/users.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UsersRepository, RecruiterProfilesRepository])],
  controllers: [RecruiterProfilesController],
  providers: [RecruiterProfilesService]
})
export class RecruiterProfilesModule {}
