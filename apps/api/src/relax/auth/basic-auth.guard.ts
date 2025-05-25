import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { ContextLogger } from 'nestjs-context-logger';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  private logger = new ContextLogger(BasicAuthGuard.name);
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if basic auth is enabled
    const isBasicAuthEnabled = this.configService.get<string>('BASIC_AUTH_ENABLED') === '1';
    this.logger.log(`Basic auth enabled: ${isBasicAuthEnabled ? 'YES' : 'NO'}`);

    // If basic auth is disabled, allow the request
    if (!isBasicAuthEnabled) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    // If no auth header is provided, reject the request
    if (!authHeader) {
      this.logger.error('Baisc authorization is enabled but no authorization header is provided');
      throw new UnauthorizedException('Missing authorization header');
    }

    // Check if it's a Basic auth header
    if (!authHeader.startsWith('Basic ')) {
      this.logger.error(
        'Baisc authorization is enabled but authorization header format is invalid',
      );
      throw new UnauthorizedException('Invalid authorization header format');
    }

    // Extract credentials
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    // Get expected credentials from environment variables
    const expectedUsername = this.configService.get<string>('BASIC_AUTH_USERNAME');
    const expectedPassword = this.configService.get<string>('BASIC_AUTH_PASSWORD');

    // Validate credentials
    if (username !== expectedUsername || password !== expectedPassword) {
      this.logger.error('Invalid Baisc authorization credentials are provided');
      throw new UnauthorizedException('Invalid credentials');
    }

    return true;
  }
}
