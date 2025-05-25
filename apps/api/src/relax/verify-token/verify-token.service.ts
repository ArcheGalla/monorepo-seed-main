import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { VerifyTokenRequestDto, VerifyTokenResponseDto } from './dto';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { RelaxToken, RelaxWallet } from '../entities';
import { ContextLogger } from 'nestjs-context-logger';

@Injectable()
export class VerifyTokenService {
  private readonly logger = new ContextLogger(VerifyTokenService.name);

  constructor(
    @InjectRepository(RelaxToken)
    private readonly relaxTokenRepository: Repository<RelaxToken>,
    @InjectRepository(RelaxWallet)
    private readonly relaxWalletRepository: Repository<RelaxWallet>,
  ) {}

  /**
   * Verifies the authentication token and returns player information
   * @param verifyTokenDto The token verification request
   * @returns Player information if token is valid
   * @throws UnauthorizedException if token is invalid
   * @throws BadRequestException if request is invalid
   * @throws InternalServerErrorException if an unexpected error occurs
   */
  async verifyToken(verifyTokenDto: VerifyTokenRequestDto): Promise<VerifyTokenResponseDto> {
    try {
      this.logger.log('Processing token verification', {
        channel: verifyTokenDto.channel,
        clientid: verifyTokenDto.clientid,
        gameref: verifyTokenDto.gameref,
        token: verifyTokenDto.token,
      });

      // Find the token in the database where ticket matches and ticket_claimed_at is null
      const tokenRecord = await this.relaxTokenRepository.findOne({
        where: {
          ticket: verifyTokenDto.token,
          ticket_claimed_at: IsNull(),
        },
      });

      // If no token found, throw unauthorized exception
      if (!tokenRecord) {
        const errorResponse: ErrorResponseDto = {
          errorcode: 'INVALID_TOKEN',
          errormessage: 'The provided token is invalid or expired',
        };
        this.logger.error('Token validation failed - token not found or already claimed', {
          error: errorResponse,
        });
        throw new UnauthorizedException(errorResponse);
      }

      // set tokenRecord ticket_claimed_at to current timestamp
      tokenRecord.ticket_claimed_at = new Date();
      await this.relaxTokenRepository.save(tokenRecord);

      // Find the wallet for this player and currency
      const wallet = await this.relaxWalletRepository.findOne({
        where: {
          player_id: tokenRecord.player,
          currency: tokenRecord.customercurrency,
        },
      });

      // Get the balance from the wallet or default to 0 if wallet not found
      const balance = wallet ? wallet.balance : 0;

      // Create response using data from the token record
      const response: VerifyTokenResponseDto = {
        customerid: tokenRecord.player,
        countrycode: tokenRecord.countrycode,
        cashiertoken: tokenRecord.cashiertoken,
        customercurrency: tokenRecord.customercurrency,
        balance: balance,
        jurisdiction: tokenRecord.jurisdiction,
      };

      this.logger.log('Token verified successfully', {
        customerid: response.customerid,
        countrycode: response.countrycode,
        customercurrency: response.customercurrency,
        balance: response.balance,
        jurisdiction: response.jurisdiction,
        cashiertoken: response.cashiertoken,
      });

      return response;
    } catch (error) {
      // Re-throw known exceptions
      if (error instanceof UnauthorizedException || error instanceof BadRequestException) {
        throw error;
      }

      // Log and wrap unknown exceptions
      this.logger.error('Error processing token verification', {
        error: (error as Error).message,
        stack: (error as Error).stack,
      });

      const errorResponse: ErrorResponseDto = {
        errorcode: 'INTERNAL_ERROR',
        errormessage: 'An internal server error occurred',
      };
      throw new InternalServerErrorException(errorResponse);
    }
  }
}
