import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../payloads/jwt.payload";
import { acccessTokenJwtConfig } from "src/config/jwt.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor(
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => (request?.cookies['access_token'])
      ]),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey : process.env['ACCESS_TOKEN_JWT_SECRETKEY']
    })
  }

  async validate(req, payload: JwtPayload) {    
    if(payload?.id) {
      return payload;
    }
    return false;
  }

}