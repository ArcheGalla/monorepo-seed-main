import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ForbiddenException,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { ContextLogger } from '../common/logger';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { BasicAuthGuard } from '../auth/basic-auth.guard';
import { DepositRequestDto } from './dto/deposit-request.dto';
import { DepositResponseDto } from './dto/deposit-response.dto';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { DepositService } from './deposit.service';

@ApiTags('Relax Webhooks')
@Controller('api/relax')
export class DepositController {
  private readonly logger = new ContextLogger(DepositController.name);
  constructor(private readonly depositService: DepositService) {}

  @Post('deposit')
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Process a deposit request.' })
  @ApiBody({ type: DepositRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Deposit processed successfully',
    type: DepositResponseDto,
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
  async deposit(@Body() depositDto: DepositRequestDto): Promise<DepositResponseDto> {
    this.logger.log('Received deposit request', {
      customerid: depositDto.customerid,
      currency: depositDto.currency,
      txid: depositDto.txid,
      amount: depositDto.amount,
      gameref: depositDto.gameref,
      channel: depositDto.channel,
      cashiertoken: depositDto.cashiertoken,
    });

    try {
      // Delegate to the service
      const response = await this.depositService.deposit(depositDto);

      this.logger.log('Sending deposit response', {
        txid: response.txid,
        remotetxid: response.remotetxid,
        balance: response.balance,
      });

      return response;
    } catch (error) {
      // Handle specific error cases
      if (error instanceof ForbiddenException) {
        throw error;
      }

      // Log and re-throw other errors
      this.logger.error('Error processing deposit request', {
        error: error.message,
        stack: error.stack,
      });

      if (error instanceof InternalServerErrorException) {
        throw error;
      }

      // Wrap unknown errors
      const errorResponse: ErrorResponseDto = {
        errorcode: 'INTERNAL_ERROR',
        errormessage: 'An internal server error occurred',
      };
      throw new InternalServerErrorException(errorResponse);
    }
  }
}
