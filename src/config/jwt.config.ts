import { JwtModuleOptions } from '@nestjs/jwt';
import 'dotenv/config';

export const acccessTokenJwtConfig : JwtModuleOptions = {
    secret: process.env['ACCESS_TOKEN_JWT_SECRETKEY'],
    signOptions: { expiresIn: '1d' },
};

export const refreshTokenJwtConfig : JwtModuleOptions = {
    secret: process.env['REFRESH_TOKEN_JWT_SECRETKEY'],
    signOptions: { expiresIn: '1y' },
};