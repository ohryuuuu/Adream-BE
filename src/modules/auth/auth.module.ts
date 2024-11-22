import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { TypeOrmExModule } from 'src/config/typeorm/typeorm-ex.module';
import { UserRepository } from '../users/user.repository';
import { PassportModule } from '@nestjs/passport';
import 'dotenv/config';
import { passportConfig } from 'src/config/passport.config';


@Module({
  imports: [
    PassportModule.register(passportConfig),
    JwtModule.register(jwtConfig),
    TypeOrmExModule.forCustomRepository([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
