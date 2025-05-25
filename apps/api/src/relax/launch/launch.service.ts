import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { LaunchRequestDto, LaunchResponseDto } from './dto';
import { RelaxToken } from '../entities';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { JwtPayload } from '../auth/interfaces';
import { ContextLogger } from 'nestjs-context-logger';

@Injectable()
export class LaunchService {
  private readonly logger = new ContextLogger(LaunchService.name);

  constructor(
    private configService: ConfigService,
    @InjectRepository(RelaxToken)
    private relaxTokenRepository: Repository<RelaxToken>,
  ) {}

  /**
   * Process a game launch request
   * @param launchRequestDto The launch request data
   * @param user The authenticated user from JWT token
   * @returns Launch response with launcher parameters
   * @throws BadRequestException if request is invalid
   * @throws InternalServerErrorException if an unexpected error occurs
   */
  async launchGame(
    launchRequestDto: LaunchRequestDto,
    user: JwtPayload,
  ): Promise<LaunchResponseDto> {
    try {
      this.logger.log('Processing game launch request', {
        gameid: launchRequestDto.gameid,
        channel: launchRequestDto.channel,
      });

      // Get configuration values
      const partner = this.configService.get<string>('RELAX_PARTNER');
      const partnerId = this.configService.get<string>('RELAX_PARTNER_ID');
      const launcherUrl = this.configService.get<string>('RELAX_LAUNCHER_URL');
      const countrycode = this.configService.get<string>('RELAX_PLAYER_COUNTRYCODE');
      const jurisdiction = this.configService.get<string>('RELAX_PLAYER_JURISDICTION');

      if (!partner || !partnerId || !launcherUrl) {
        const errorResponse: ErrorResponseDto = {
          errorcode: 'CONFIGURATION_ERROR',
          errormessage:
            'Missing required configuration values, plese check RELAX_PARTNER, RELAX_PARTNER_ID and RELAX_LAUNCHER_URL',
        };
        this.logger.error('Configuration error', {
          error: errorResponse,
        });
        throw new InternalServerErrorException(errorResponse);
      }

      // Generate unique UUIDs for ticket and cashiertoken for real money mode
      let ticket = '';
      let cashiertoken = '';

      ticket = uuidv4();
      cashiertoken = uuidv4();

      // Get player ID from the JWT token
      const playerId = user.sub;

      try {
        // Create a new token record
        const newToken = this.relaxTokenRepository.create({
          player: playerId,
          gameid: launchRequestDto.gameid,
          ticket: ticket,
          cashiertoken: cashiertoken,
          countrycode: countrycode,
          jurisdiction: jurisdiction,
          customercurrency: launchRequestDto.currency,
        });

        await this.relaxTokenRepository.save(newToken);

        this.logger.log('Created new token record', {
          playerId,
          gameid: launchRequestDto.gameid,
          ticket,
        });
      } catch (error) {
        this.logger.error('Error creating token record', {
          error: error.message,
          stack: error.stack,
        });
        throw new InternalServerErrorException({
          errorcode: 'DATABASE_ERROR',
          errormessage: 'Error creating token data',
        });
      }

      // Build the launcher parameters
      const launcherParams = `gameid=${launchRequestDto.gameid}&channel=${launchRequestDto.channel}&moneymode=real&partner=${partner}&partnerid=${partnerId}&ticket=${ticket}`;

      const response: LaunchResponseDto = {
        gameUrl: `${launcherUrl}?${launcherParams}`,
      };

      this.logger.log('Game URL generated successfully', {
        gameid: launchRequestDto.gameid,
        channel: launchRequestDto.channel,
        ticket: ticket,
        gameUrl: response.gameUrl,
      });

      return response;
    } catch (error) {
      // Re-throw known exceptions
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) {
        throw error;
      }

      // Log and wrap unknown exceptions
      this.logger.error('Error processing game launch', {
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
