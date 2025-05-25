import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ContextLogger } from '../common/logger';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtResponseDto } from './dto';
import { ErrorResponseDto } from '../common/dto/error-response.dto';

@ApiTags('Demo')
@Controller('api')
export class AuthController {
  private readonly logger = new ContextLogger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Get('demo/jwt')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate JWT token with the demo player data.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'JWT token generated successfully',
    type: JwtResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: ErrorResponseDto,
  })
  generateJwt(): JwtResponseDto {
    this.logger.log('Received JWT generation request');

    // Generate JWT token with hardcoded player data
    const response = this.authService.generateJwtToken();

    this.logger.log('Sending JWT response', {
      tokenLength: response.token.length,
    });

    return response;
  }
}
