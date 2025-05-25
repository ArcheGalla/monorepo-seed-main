import { Injectable } from '@nestjs/common';
import { ContextLogger } from '../common/logger';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtResponseDto } from './dto';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  private readonly logger = new ContextLogger(AuthService.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Generate a JWT token with hardcoded player data
   * @returns JwtResponseDto containing the generated token
   */
  generateJwtToken(): JwtResponseDto {
    // Hardcoded player data as per requirements
    const payload: JwtPayload = {
      sub: '2d63516e-496c-4ac7-a8c3-233723735c59', // Player identifier from operator
    };

    this.logger.log('Generating JWT token', {
      userid: payload.sub,
    });

    // Get JWT expiration time from environment variables
    const expiresIn = `${this.configService.get<number>('JWT_LIFETIME_MINUTES')}m`;

    // Generate the JWT token
    const token = this.jwtService.sign(payload, {
      expiresIn,
    });

    return { token };
  }
}
