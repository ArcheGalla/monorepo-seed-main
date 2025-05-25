import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { VerifyTokenRequestDto, VerifyTokenResponseDto } from './dto/';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { VerifyTokenService } from './verify-token.service';
import { BasicAuthGuard } from '../auth/basic-auth.guard';
import { ContextLogger } from 'nestjs-context-logger';

@ApiTags('Relax Webhooks')
@Controller('api/relax')
export class VerifyTokenController {
  private readonly logger = new ContextLogger(VerifyTokenController.name);

  constructor(private readonly verifyTokenService: VerifyTokenService) {}

  @Post('verifyToken')
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify authentication token.' })
  @ApiBody({ type: VerifyTokenRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token verified successfully',
    type: VerifyTokenResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request parameters',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid token',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: ErrorResponseDto,
  })
  async verifyToken(
    @Body() verifyTokenDto: VerifyTokenRequestDto,
  ): Promise<VerifyTokenResponseDto> {
    this.logger.log('Received verifyToken request', {
      channel: verifyTokenDto.channel,
      clientid: verifyTokenDto.clientid,
      gameref: verifyTokenDto.gameref,
      token: verifyTokenDto.token,
    });

    // Delegate to the service
    const response = await this.verifyTokenService.verifyToken(verifyTokenDto);

    this.logger.log('Sending verifyToken response', {
      customerid: response.customerid,
      countrycode: response.countrycode,
      customercurrency: response.customercurrency,
      balance: response.balance,
      jurisdiction: response.jurisdiction,
      cashiertokenLength: response.cashiertoken,
    });

    return response;
  }
}
