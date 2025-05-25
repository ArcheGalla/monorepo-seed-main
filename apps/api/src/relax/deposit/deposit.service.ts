import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ContextLogger } from '../common/logger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, IsNull } from 'typeorm';
import { DepositRequestDto } from './dto/deposit-request.dto';
import { DepositResponseDto } from './dto/deposit-response.dto';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { RelaxWallet, RelaxTransaction, TransactionAction, TransactionType } from '../entities';

@Injectable()
export class DepositService {
  private readonly logger = new ContextLogger(DepositService.name);
  constructor(
    @InjectRepository(RelaxWallet)
    private readonly relaxWalletRepository: Repository<RelaxWallet>,
    @InjectRepository(RelaxTransaction)
    private readonly relaxTransactionRepository: Repository<RelaxTransaction>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Process a deposit request
   * @param depositDto The deposit request
   * @returns Deposit response with updated balance
   * @throws NotFoundException if wallet is not found
   * @throws InternalServerErrorException if an unexpected error occurs
   */
  async deposit(depositDto: DepositRequestDto): Promise<DepositResponseDto> {
    try {
      this.logger.log('Processing deposit request', {
        customerid: depositDto.customerid,
        currency: depositDto.currency,
        txid: depositDto.txid,
        amount: depositDto.amount,
        gameref: depositDto.gameref,
        channel: depositDto.channel,
        cashiertoken: depositDto.cashiertoken,
      });

      // Check if transaction already exists (idempotency check)
      const existingTransaction = await this.relaxTransactionRepository.findOne({
        where: {
          txid: depositDto.txid,
          errorcode: IsNull(),
        },
      });

      // If transaction exists and has no error, return the existing data
      if (existingTransaction) {
        this.logger.log('Transaction already processed (idempotent request)', {
          txid: depositDto.txid,
          remotetxid: existingTransaction.id,
        });

        return {
          balance: existingTransaction.balance_after,
          txid: depositDto.txid,
          remotetxid: existingTransaction.id,
        };
      }

      // Start a transaction
      return await this.dataSource.transaction(async transactionManager => {
        // Find the wallet for this player and currency
        const wallet = await transactionManager.findOne(RelaxWallet, {
          where: {
            player_id: depositDto.customerid,
            currency: depositDto.currency,
          },
        });

        // If no wallet found, handle error
        if (!wallet) {
          return await this.handleError(
            depositDto,
            'TRANSACTION_DECLINED',
            'No wallet found for the specified player and currency',
            'Wallet not found',
            null,
            transactionManager,
          );
        }

        // Calculate balance values
        const balanceBefore = wallet.balance;
        const balanceDiff = depositDto.amount; // Positive for deposits
        const balanceAfter = balanceBefore + depositDto.amount;

        // Update the wallet balance
        wallet.balance = balanceAfter;
        await transactionManager.save(wallet);

        // Create transaction record
        const transaction = new RelaxTransaction();
        transaction.balance_before = balanceBefore;
        transaction.balance_after = balanceAfter;
        transaction.balance_diff = balanceDiff;
        transaction.action = TransactionAction.DEPOSIT;
        transaction.txtype = depositDto.txtype as unknown as TransactionType;
        transaction.customerid = depositDto.customerid;
        transaction.currency = depositDto.currency;
        transaction.txid = depositDto.txid;
        transaction.amount = depositDto.amount;
        transaction.gameref = depositDto.gameref;
        transaction.gameid = depositDto.gameid;
        transaction.gamesessionid = depositDto.gamesessionid;
        transaction.channel = depositDto.channel as any;
        transaction.clientid = depositDto.clientid;
        if (depositDto.cashiertoken) {
          transaction.cashiertoken = depositDto.cashiertoken;
        }
        transaction.ended = depositDto.ended;

        if (depositDto.jpcontribution) {
          transaction.jpcontribution = depositDto.jpcontribution;
        }

        if (depositDto.jackpotpayout) {
          transaction.jackpotpayout = depositDto.jackpotpayout;
        }

        if (depositDto.promocode) {
          transaction.promocode = depositDto.promocode;
        }

        if (depositDto.promotionid) {
          transaction.promotionid = depositDto.promotionid;
        }

        // Save the transaction
        const savedTransaction = await transactionManager.save(transaction);

        // Create response
        const response: DepositResponseDto = {
          balance: balanceAfter,
          txid: depositDto.txid,
          remotetxid: savedTransaction.id,
        };

        this.logger.log('Deposit processed successfully', {
          customerid: depositDto.customerid,
          currency: depositDto.currency,
          txid: depositDto.txid,
          amount: depositDto.amount,
          newBalance: response.balance,
          remotetxid: response.remotetxid,
        });

        return response;
      });
    } catch (error) {
      // Re-throw known exceptions
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }

      // Log and wrap unknown exceptions
      this.logger.error('Error processing deposit request', {
        error: error.message,
        stack: error.stack,
      });

      // Find the wallet to get the current balance for error handling
      let wallet: RelaxWallet | null = null;
      try {
        wallet = await this.relaxWalletRepository.findOne({
          where: {
            player_id: depositDto.customerid,
            currency: depositDto.currency,
          },
        });
      } catch (walletError) {
        this.logger.error('Error finding wallet for error handling', {
          error: walletError.message,
          stack: walletError.stack,
        });
      }

      return await this.handleError(
        depositDto,
        'INTERNAL_ERROR',
        'An internal server error occurred',
        'Error processing deposit request',
        wallet,
      );
    }
  }

  /**
   * Handle error cases by creating a transaction record with error details
   * and returning appropriate response
   */
  private async handleError(
    depositDto: DepositRequestDto,
    errorCode: string,
    errorMessage: string,
    logMessage: string,
    wallet: RelaxWallet | null,
    transactionManager?: any,
  ): Promise<DepositResponseDto> {
    const errorResponse: ErrorResponseDto = {
      errorcode: errorCode,
      errormessage: errorMessage,
    };

    this.logger.error(logMessage, {
      error: errorResponse,
      customerid: depositDto.customerid,
      currency: depositDto.currency,
      txid: depositDto.txid,
    });

    // Create transaction record with error information
    const transaction = new RelaxTransaction();

    // If we have wallet information, use it for balance calculations
    if (wallet) {
      transaction.balance_before = wallet.balance;
      transaction.balance_after = wallet.balance;
      transaction.balance_diff = 0; // No change in balance for error cases
    } else {
      // If no wallet, set all balance fields to 0
      transaction.balance_before = 0;
      transaction.balance_after = 0;
      transaction.balance_diff = 0;
    }

    transaction.errorcode = errorCode;
    transaction.errormessage = errorMessage;
    transaction.action = TransactionAction.DEPOSIT;
    transaction.txtype = depositDto.txtype as unknown as TransactionType;
    transaction.customerid = depositDto.customerid;
    transaction.currency = depositDto.currency;
    transaction.txid = depositDto.txid;
    transaction.amount = depositDto.amount;
    transaction.gameref = depositDto.gameref;
    transaction.gameid = depositDto.gameid;
    transaction.gamesessionid = depositDto.gamesessionid;
    transaction.channel = depositDto.channel as any;
    transaction.clientid = depositDto.clientid;
    if (depositDto.cashiertoken) {
      transaction.cashiertoken = depositDto.cashiertoken;
    }
    transaction.ended = depositDto.ended;

    if (depositDto.jpcontribution) {
      transaction.jpcontribution = depositDto.jpcontribution;
    }

    if (depositDto.jackpotpayout) {
      transaction.jackpotpayout = depositDto.jackpotpayout;
    }

    if (depositDto.promocode) {
      transaction.promocode = depositDto.promocode;
    }

    if (depositDto.promotionid) {
      transaction.promotionid = depositDto.promotionid;
    }

    if (transactionManager) {
      await transactionManager.save(transaction);
    } else {
      await this.relaxTransactionRepository.save(transaction);
    }

    throw new InternalServerErrorException(errorResponse);
  }
}
