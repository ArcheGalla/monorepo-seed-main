import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interfaces';
import { ContextLogger } from 'nestjs-context-logger';
import { uuidValidateV4 } from '../common/uuidv4-validator';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new ContextLogger(JwtStrategy.name);
  constructor(configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET');

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    // Validate the JWT payload
    if (!payload.sub) {
      this.logger.error('Invalid token payload. Make sure "sub" is provided.');
      throw new UnauthorizedException('Invalid token payload. Make sure "sub"is provided.');
    }
    // validate payload.sub is a valid UUID v4
    if (!uuidValidateV4(payload.sub)) {
      this.logger.error('Invalid token payload. Make sure "sub" is a valid UUID v4.');
      throw new UnauthorizedException('Invalid token payload. Make sure "sub" is a valid UUID v4.');
    }

    // Return the user data from the token
    return payload;
  }
}
