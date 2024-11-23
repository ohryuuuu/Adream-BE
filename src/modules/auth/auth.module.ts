import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { acccessTokenJwtConfig } from 'src/config/jwt.config';
import { TypeOrmExModule } from 'src/config/typeorm/typeorm-ex.module';
import { UsersRepository } from '../users/users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';



@Module({
  imports: [
    PassportModule,
    JwtModule.register(acccessTokenJwtConfig),
    TypeOrmExModule.forCustomRepository([UsersRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports : [AuthService, JwtModule, JwtStrategy]
})
export class AuthModule {}
