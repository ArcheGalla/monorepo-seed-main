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
import { RollbackRequestDto } from './dto/rollback-request.dto';
import { RollbackResponseDto } from './dto/rollback-response.dto';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { RollbackService } from './rollback.service';

@ApiTags('Relax Webhooks')
@Controller('api/relax')
export class RollbackController {
  private readonly logger = new ContextLogger(RollbackController.name);
  constructor(private readonly rollbackService: RollbackService) {}

  @Post('rollback')
  @UseGuards(BasicAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Process a rollback request.' })
  @ApiBody({ type: RollbackRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rollback processed successfully',
    type: RollbackResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request parameters',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Transaction declined',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Wallet or original transaction not found',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: ErrorResponseDto,
  })
  async rollback(@Body() rollbackDto: RollbackRequestDto): Promise<RollbackResponseDto> {
    this.logger.log('Received rollback request', {
      customerid: rollbackDto.customerid,
      txid: rollbackDto.txid,
      originaltxid: rollbackDto.originaltxid,
      gamesessionid: rollbackDto.gamesessionid,
    });

    try {
      // Delegate to the service
      const response = await this.rollbackService.rollback(rollbackDto);

      this.logger.log('Sending rollback response', {
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
      this.logger.error('Error processing rollback request', {
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
