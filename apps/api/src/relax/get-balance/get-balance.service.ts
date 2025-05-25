import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetBalanceRequestDto } from './dto/get-balance-request.dto';
import { GetBalanceResponseDto } from './dto/get-balance-response.dto';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { RelaxWallet } from '../entities';
import { ContextLogger } from 'nestjs-context-logger';

@Injectable()
export class GetBalanceService {
  private readonly logger = new ContextLogger(GetBalanceService.name);

  constructor(
    @InjectRepository(RelaxWallet)
    private readonly relaxWalletRepository: Repository<RelaxWallet>,
  ) {}

  /**
   * Get player balance
   * @param getBalanceDto The balance request
   * @returns Player balance information
   * @throws NotFoundException if wallet is not found
   * @throws InternalServerErrorException if an unexpected error occurs
   */
  async getBalance(getBalanceDto: GetBalanceRequestDto): Promise<GetBalanceResponseDto> {
    try {
      this.logger.log('Processing get balance request', {
        customerid: getBalanceDto.customerid,
        currency: getBalanceDto.currency,
        gameref: getBalanceDto.gameref,
        channel: getBalanceDto.channel,
        cashiertoken: getBalanceDto.cashiertoken,
      });

      // Find the wallet for this player and currency
      const wallet = await this.relaxWalletRepository.findOne({
        where: {
          player_id: getBalanceDto.customerid,
          currency: getBalanceDto.currency,
        },
      });

      // If no wallet found, throw not found exception
      if (!wallet) {
        const errorResponse: ErrorResponseDto = {
          errorcode: 'WALLET_NOT_FOUND',
          errormessage: 'No wallet found for the specified player and currency',
        };
        this.logger.error('Wallet not found', {
          error: errorResponse,
          data: {
            customerid: getBalanceDto.customerid,
            currency: getBalanceDto.currency,
          },
        });
        throw new NotFoundException(errorResponse);
      }

      // Create response using data from the wallet
      const response: GetBalanceResponseDto = {
        balance: wallet.balance,
        customercurrency: getBalanceDto.currency,
      };

      this.logger.log('Balance retrieved successfully', {
        customerid: getBalanceDto.customerid,
        customercurrency: response.customercurrency,
        balance: response.balance,
      });

      return response;
    } catch (error) {
      // Re-throw known exceptions
      if (error instanceof NotFoundException) {
        throw error;
      }

      // Log and wrap unknown exceptions
      this.logger.error('Error processing get balance request', {
        error: error.message,
        stack: error.stack,
      });

      const errorResponse: ErrorResponseDto = {
        errorcode: 'INTERNAL_ERROR',
        errormessage: 'An internal server error occurred',
      };
      throw new InternalServerErrorException(errorResponse);
    }
  }
}
