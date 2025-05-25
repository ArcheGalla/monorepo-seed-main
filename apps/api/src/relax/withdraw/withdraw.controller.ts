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
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { BasicAuthGuard } from '../auth/basic-auth.guard';
import { WithdrawRequestDto } from './dto/withdraw-request.dto';
import { WithdrawResponseDto } from './dto/withdraw-response.dto';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { WithdrawService } from './withdraw.service';
import { ContextLogger } from 'nestjs-context-logger';

@ApiTags('Relax Webhooks')
@Controller('api/relax')
export class WithdrawController {
  private readonly logger = new ContextLogger(WithdrawController.name);

  constructor(private readonly withdrawService: WithdrawService) {}

  @Post('withdraw')
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Process a withdraw request.' })
  @ApiBody({ type: WithdrawRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Withdraw processed successfully',
    type: WithdrawResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request parameters',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Insufficient funds or transaction declined',
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
  async withdraw(@Body() withdrawDto: WithdrawRequestDto): Promise<WithdrawResponseDto> {
    this.logger.log('Received withdraw request', {
      customerid: withdrawDto.customerid,
      currency: withdrawDto.currency,
      txid: withdrawDto.txid,
      amount: withdrawDto.amount,
      gameref: withdrawDto.gameref,
      channel: withdrawDto.channel,
      cashiertoken: withdrawDto.cashiertoken,
    });

    try {
      // Delegate to the service
      const response = await this.withdrawService.withdraw(withdrawDto);

      this.logger.log('Sending withdraw response', {
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
      this.logger.error('Error processing withdraw request', {
        error: (error as Error).message,
        stack: (error as Error).stack,
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
