import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { GetBalanceRequestDto, GetBalanceResponseDto } from './dto';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { GetBalanceService } from './get-balance.service';
import { BasicAuthGuard } from '../auth/basic-auth.guard';
import { ContextLogger } from 'nestjs-context-logger';

@ApiTags('Relax Webhooks')
@Controller('api/relax')
export class GetBalanceController {
  private readonly logger = new ContextLogger(GetBalanceController.name);

  constructor(private readonly getBalanceService: GetBalanceService) {}

  @Post('getBalance')
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get player balance.' })
  @ApiBody({ type: GetBalanceRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Balance retrieved successfully',
    type: GetBalanceResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request parameters',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Wallet not found',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: ErrorResponseDto,
  })
  async getBalance(@Body() getBalanceDto: GetBalanceRequestDto): Promise<GetBalanceResponseDto> {
    this.logger.log('Received getBalance request', {
      customerid: getBalanceDto.customerid,
      currency: getBalanceDto.currency,
      gameref: getBalanceDto.gameref,
      channel: getBalanceDto.channel,
      cashiertoken: getBalanceDto.cashiertoken,
    });

    // Delegate to the service
    const response = await this.getBalanceService.getBalance(getBalanceDto);

    this.logger.log('Sending getBalance response', {
      customercurrency: response.customercurrency,
      balance: response.balance,
    });

    return response;
  }
}
