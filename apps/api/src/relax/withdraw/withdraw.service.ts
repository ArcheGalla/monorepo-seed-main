import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, IsNull } from 'typeorm';
import { WithdrawRequestDto } from './dto/withdraw-request.dto';
import { WithdrawResponseDto } from './dto/withdraw-response.dto';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import {
  RelaxToken,
  RelaxWallet,
  RelaxTransaction,
  TransactionAction,
  TransactionType,
} from '../entities';
import { ContextLogger } from 'nestjs-context-logger';

@Injectable()
export class WithdrawService {
  private readonly logger = new ContextLogger(WithdrawService.name);

  constructor(
    @InjectRepository(RelaxWallet)
    private readonly relaxWalletRepository: Repository<RelaxWallet>,
    @InjectRepository(RelaxToken)
    private readonly relaxTokenRepository: Repository<RelaxToken>,
    @InjectRepository(RelaxTransaction)
    private readonly relaxTransactionRepository: Repository<RelaxTransaction>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Process a withdraw request
   * @param withdrawDto The withdraw request
   * @returns Withdraw response with updated balance
   * @throws ForbiddenException if insufficient funds
   * @throws NotFoundException if wallet is not found
   * @throws InternalServerErrorException if an unexpected error occurs
   */
  async withdraw(withdrawDto: WithdrawRequestDto): Promise<WithdrawResponseDto> {
    try {
      this.logger.log('Processing withdraw request', {
        data: {
          customerid: withdrawDto.customerid,
          currency: withdrawDto.currency,
          txid: withdrawDto.txid,
          amount: withdrawDto.amount,
          gameref: withdrawDto.gameref,
          channel: withdrawDto.channel,
          cashiertoken: withdrawDto.cashiertoken,
        },
      });
      // Check cashier token
      const tokenRecord = await this.relaxTokenRepository.findOne({
        where: {
          cashiertoken: withdrawDto.cashiertoken,
          gameid: withdrawDto.gameref,
          player: withdrawDto.customerid,
        },
      });

      if (!tokenRecord) {
        return await this.handleError(
          withdrawDto,
          'TRANSACTION_DECLINED',
          'The provided cashier token is invalid',
          'Cashier token validation failed',
          null,
        );
      }
      // Check if transaction already exists (idempotency check)
      const existingTransaction = await this.relaxTransactionRepository.findOne({
        where: {
          txid: withdrawDto.txid,
          errorcode: IsNull(),
        },
      });

      // If transaction exists and has no error, return the existing data
      if (existingTransaction) {
        this.logger.log('Transaction already processed (idempotent request)', {
          txid: withdrawDto.txid,
          remotetxid: existingTransaction.id,
        });

        return {
          balance: existingTransaction.balance_after,
          txid: withdrawDto.txid,
          remotetxid: existingTransaction.id,
        };
      }

      // Start a transaction
      return await this.dataSource.transaction(async transactionManager => {
        // Find the wallet for this player and currency
        const wallet = await transactionManager.findOne(RelaxWallet, {
          where: {
            player_id: withdrawDto.customerid,
            currency: withdrawDto.currency,
          },
        });

        // If no wallet found, handle error
        if (!wallet) {
          return await this.handleError(
            withdrawDto,
            'TRANSACTION_DECLINED',
            'No wallet found for the specified player and currency',
            'Wallet not found',
            null,
            transactionManager,
          );
        }

        // Check if there are sufficient funds
        if (wallet.balance < withdrawDto.amount) {
          return await this.handleError(
            withdrawDto,
            'INSUFFICIENT_FUNDS',
            'There are insufficient funds to go through with the withdrawal.',
            'Insufficient funds',
            wallet,
            transactionManager,
          );
        }

        // Calculate balance values
        const balanceBefore = wallet.balance;
        const balanceDiff = -withdrawDto.amount; // Negative for withdrawals
        const balanceAfter = balanceBefore - withdrawDto.amount;

        // Update the wallet balance
        wallet.balance = balanceAfter;
        await transactionManager.save(wallet);

        // Create transaction record
        const transaction = new RelaxTransaction();
        transaction.balance_before = balanceBefore;
        transaction.balance_after = balanceAfter;
        transaction.balance_diff = balanceDiff;
        transaction.action = TransactionAction.WITHDRAW;
        transaction.txtype = withdrawDto.txtype as unknown as TransactionType;
        transaction.customerid = withdrawDto.customerid;
        transaction.currency = withdrawDto.currency;
        transaction.txid = withdrawDto.txid;
        transaction.amount = withdrawDto.amount;
        transaction.gameref = withdrawDto.gameref;
        transaction.gameid = withdrawDto.gameid;
        transaction.gamesessionid = withdrawDto.gamesessionid;
        transaction.channel = withdrawDto.channel as any;
        transaction.clientid = withdrawDto.clientid;
        transaction.cashiertoken = withdrawDto.cashiertoken;
        transaction.ended = withdrawDto.ended;

        if (withdrawDto.jpcontribution) {
          transaction.jpcontribution = withdrawDto.jpcontribution;
        }

        if (withdrawDto.buyfeature !== undefined) {
          transaction.buyfeature = withdrawDto.buyfeature;
        }

        if (withdrawDto.promocode) {
          transaction.promocode = withdrawDto.promocode;
        }

        // Save the transaction
        const savedTransaction = await transactionManager.save(transaction);

        // Create response
        const response: WithdrawResponseDto = {
          balance: balanceAfter,
          txid: withdrawDto.txid,
          remotetxid: savedTransaction.id,
        };

        this.logger.log('Withdraw processed successfully', {
          customerid: withdrawDto.customerid,
          currency: withdrawDto.currency,
          txid: withdrawDto.txid,
          amount: withdrawDto.amount,
          newBalance: response.balance, // balanceAfter
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
      this.logger.error('Error processing withdraw request', {
        error: (error as Error).message,
        stack: (error as Error).stack,
      });

      // Find the wallet to get the current balance for error handling
      let wallet: RelaxWallet | null = null;
      try {
        wallet = await this.relaxWalletRepository.findOne({
          where: {
            player_id: withdrawDto.customerid,
            currency: withdrawDto.currency,
          },
        });
      } catch (walletError) {
        this.logger.error('Error finding wallet for error handling', {
          error: (walletError as Error).message,
        });
      }

      return await this.handleError(
        withdrawDto,
        'INTERNAL_ERROR',
        'An internal server error occurred',
        'Error processing withdraw request',
        wallet,
      );
    }
  }

  /**
   * Handle error cases by creating a transaction record with error details
   * and returning appropriate response
   */
  private async handleError(
    withdrawDto: WithdrawRequestDto,
    errorCode: string,
    errorMessage: string,
    logMessage: string,
    wallet: RelaxWallet | null,
    transactionManager?: any,
  ): Promise<WithdrawResponseDto> {
    const errorResponse: ErrorResponseDto = {
      errorcode: errorCode,
      errormessage: errorMessage,
    };

    this.logger.error(logMessage, {
      error: errorResponse,
      data: {
        customerid: withdrawDto.customerid,
        currency: withdrawDto.currency,
        txid: withdrawDto.txid,
      },
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
    transaction.action = TransactionAction.WITHDRAW;
    transaction.txtype = withdrawDto.txtype as unknown as TransactionType;
    transaction.customerid = withdrawDto.customerid;
    transaction.currency = withdrawDto.currency;
    transaction.txid = withdrawDto.txid;
    transaction.amount = withdrawDto.amount;
    transaction.gameref = withdrawDto.gameref;
    transaction.gameid = withdrawDto.gameid;
    transaction.gamesessionid = withdrawDto.gamesessionid;
    transaction.channel = withdrawDto.channel as any;
    transaction.clientid = withdrawDto.clientid;
    transaction.cashiertoken = withdrawDto.cashiertoken;
    transaction.ended = withdrawDto.ended;

    if (withdrawDto.jpcontribution) {
      transaction.jpcontribution = withdrawDto.jpcontribution;
    }

    if (withdrawDto.buyfeature !== undefined) {
      transaction.buyfeature = withdrawDto.buyfeature;
    }

    if (withdrawDto.promocode) {
      transaction.promocode = withdrawDto.promocode;
    }

    // Save the transaction, either within an existing transaction or as a new one
    let savedTransaction: RelaxTransaction;

    if (transactionManager) {
      savedTransaction = await transactionManager.save(transaction);
    } else {
      savedTransaction = await this.relaxTransactionRepository.save(transaction);
    }

    // Throw appropriate exception based on error code
    if (errorCode === 'INSUFFICIENT_FUNDS' || errorCode === 'TRANSACTION_DECLINED') {
      throw new ForbiddenException(errorResponse);
    } else {
      throw new InternalServerErrorException(errorResponse);
    }
  }
}
