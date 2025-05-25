import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, IsNull } from 'typeorm';
import { RollbackRequestDto } from './dto/rollback-request.dto';
import { RollbackResponseDto } from './dto/rollback-response.dto';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { RelaxWallet, RelaxTransaction, TransactionAction } from '../entities';
import { ContextLogger } from 'nestjs-context-logger';

@Injectable()
export class RollbackService {
  private readonly logger = new ContextLogger(RollbackService.name);
  constructor(
    @InjectRepository(RelaxWallet)
    private readonly relaxWalletRepository: Repository<RelaxWallet>,
    @InjectRepository(RelaxTransaction)
    private readonly relaxTransactionRepository: Repository<RelaxTransaction>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Process a rollback request
   * @param rollbackDto The rollback request
   * @returns Rollback response with updated balance
   * @throws ForbiddenException if transaction cannot be rolled back
   * @throws NotFoundException if wallet or original transaction is not found
   * @throws InternalServerErrorException if an unexpected error occurs
   */
  async rollback(rollbackDto: RollbackRequestDto): Promise<RollbackResponseDto> {
    try {
      this.logger.log('Processing rollback request', {
        customerid: rollbackDto.customerid,
        txid: rollbackDto.txid,
        originaltxid: rollbackDto.originaltxid,
        gamesessionid: rollbackDto.gamesessionid,
      });

      // Check if transaction already exists with no error (idempotency check)
      const existingSuccessfulTransaction = await this.relaxTransactionRepository.findOne({
        where: {
          txid: rollbackDto.txid,
          errorcode: IsNull(),
        },
      });

      // If transaction exists and has no error, return the existing data
      if (existingSuccessfulTransaction) {
        this.logger.log('Transaction already processed successfully (idempotent request)', {
          txid: existingSuccessfulTransaction.txid,
          remotetxid: existingSuccessfulTransaction.id,
        });

        return {
          balance: existingSuccessfulTransaction.balance_after,
          txid: existingSuccessfulTransaction.txid,
          remotetxid: existingSuccessfulTransaction.id,
        };
      }

      // Start a transaction
      return await this.dataSource.transaction(async transactionManager => {
        // Find the original transaction to get currency information
        const originalTransaction = await transactionManager.findOne(RelaxTransaction, {
          where: {
            txid: rollbackDto.originaltxid,
            errorcode: IsNull(),
            action: TransactionAction.WITHDRAW, // rollbacks are for withdraws only
          },
        });

        // If original transaction not found or has errors, handle error
        if (!originalTransaction) {
          return await this.handleError(
            rollbackDto,
            'TRANSACTION_DECLINED',
            'Original transaction not found',
            'Original transaction not found',
            null, // not possbile to get wallet because the currency is unknown
            transactionManager,
          );
        }

        // Find the wallet for this player with the correct currency
        const wallet = await transactionManager.findOne(RelaxWallet, {
          where: {
            player_id: rollbackDto.customerid,
            currency: originalTransaction?.currency,
          },
        });

        // If no wallet found, handle error
        if (!wallet) {
          return await this.handleError(
            rollbackDto,
            'TRANSACTION_DECLINED',
            'No wallet found for the specified player and currency',
            'Wallet not found',
            null,
            transactionManager,
          );
        }

        // Calculate balance values
        const balanceBefore = wallet.balance;
        // For rollback, we reverse the original transaction's balance_diff
        const balanceDiff = originalTransaction.amount;
        const balanceAfter = balanceBefore + originalTransaction.amount;

        // Update the wallet balance
        wallet.balance = balanceAfter;
        await transactionManager.save(wallet);

        // Create transaction record
        const transaction = new RelaxTransaction();
        transaction.balance_before = balanceBefore;
        transaction.balance_after = balanceAfter;
        transaction.balance_diff = balanceDiff;
        transaction.action = TransactionAction.ROLLBACK;
        transaction.customerid = rollbackDto.customerid;
        transaction.currency = originalTransaction.currency;
        transaction.txid = rollbackDto.txid;
        transaction.amount = originalTransaction.amount; // Amount is always positive
        transaction.gameref = originalTransaction.gameref;
        transaction.gameid = originalTransaction.gameid;
        transaction.gamesessionid = rollbackDto.gamesessionid;
        transaction.channel = originalTransaction.channel;
        transaction.clientid = originalTransaction.clientid;
        transaction.originaltxid = rollbackDto.originaltxid;

        // Save the transaction
        const savedTransaction = await transactionManager.save(transaction);

        // Create response
        const response: RollbackResponseDto = {
          balance: balanceAfter,
          txid: rollbackDto.txid,
          remotetxid: savedTransaction.id,
        };

        this.logger.log('Rollback processed successfully', {
          customerid: rollbackDto.customerid,
          txid: rollbackDto.txid,
          originaltxid: rollbackDto.originaltxid,
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
      this.logger.error('Error processing rollback request', {
        error: error.message,
        stack: error.stack,
      });

      // Find the wallet to get the current balance for error handling
      let wallet: RelaxWallet | null = null;
      try {
        wallet = await this.relaxWalletRepository.findOne({
          where: {
            player_id: rollbackDto.customerid,
          },
        });
      } catch (walletError) {
        this.logger.error('Error finding wallet for error handling', {
          error: (walletError as Error).message,
        });
      }

      return await this.handleError(
        rollbackDto,
        'INTERNAL_ERROR',
        'An internal server error occurred',
        'Error processing rollback request',
        wallet,
      );
    }
  }

  /**
   * Handle error cases by creating a transaction record with error details
   * and returning appropriate response
   */
  private async handleError(
    rollbackDto: RollbackRequestDto,
    errorCode: string,
    errorMessage: string,
    logMessage: string,
    wallet: RelaxWallet | null,
    transactionManager?: any,
  ): Promise<RollbackResponseDto> {
    const errorResponse: ErrorResponseDto = {
      errorcode: errorCode,
      errormessage: errorMessage,
    };

    this.logger.error(logMessage, {
      error: errorResponse,
      customerid: rollbackDto.customerid,
      txid: rollbackDto.txid,
      originaltxid: rollbackDto.originaltxid,
    });

    // Create transaction record with error information
    const transaction = new RelaxTransaction();

    // If we have wallet information, use it for balance calculations
    if (wallet) {
      transaction.balance_before = wallet.balance;
      transaction.balance_after = wallet.balance;
      transaction.balance_diff = 0; // No change in balance for error cases
      transaction.currency = wallet.currency;
    } else {
      // If no wallet, set all balance fields to 0
      transaction.balance_before = 0;
      transaction.balance_after = 0;
      transaction.balance_diff = 0;
      transaction.currency = ''; // Will be updated if we find the original transaction
    }

    // Try to get currency from original transaction if wallet not found
    if (!wallet || transaction.currency === '') {
      try {
        // Use transaction manager if provided, otherwise use repository
        let originalTransaction;
        if (transactionManager) {
          originalTransaction = await transactionManager.findOne(RelaxTransaction, {
            where: {
              txid: rollbackDto.originaltxid,
            },
          });
        } else {
          originalTransaction = await this.relaxTransactionRepository.findOne({
            where: {
              txid: rollbackDto.originaltxid,
            },
          });
        }

        if (originalTransaction) {
          transaction.currency = originalTransaction.currency;
        }
      } catch (error) {
        this.logger.error('Error finding original transaction for error handling', {
          error: (error as Error).message,
        });
      }
    }

    transaction.errorcode = errorCode;
    transaction.errormessage = errorMessage;
    transaction.action = TransactionAction.ROLLBACK;
    transaction.customerid = rollbackDto.customerid;
    transaction.txid = rollbackDto.txid;
    transaction.amount = 0; // No amount for error cases
    transaction.gamesessionid = rollbackDto.gamesessionid;
    transaction.originaltxid = rollbackDto.originaltxid;

    // Save the transaction, either within an existing transaction or as a new one
    let savedTransaction: RelaxTransaction;

    if (transactionManager) {
      savedTransaction = await transactionManager.save(transaction);
    } else {
      savedTransaction = await this.relaxTransactionRepository.save(transaction);
    }

    // Throw appropriate exception based on error code
    if (errorCode === 'TRANSACTION_DECLINED') {
      throw new ForbiddenException(errorResponse);
    } else {
      throw new InternalServerErrorException(errorResponse);
    }
  }
}
