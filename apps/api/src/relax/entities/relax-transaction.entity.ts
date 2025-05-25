import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { numberTransformer } from '../common/transformers';

export enum TransactionAction {
  WITHDRAW = 'withdraw',
  DEPOSIT = 'deposit',
  ROLLBACK = 'rollback',
}

export enum TransactionType {
  WITHDRAW = 'withdraw',
  FSWITHDRAW = 'fswithdraw',
  DEPOSIT = 'deposit',
  FREESPINSPAYOUT = 'freespinspayout',
  FSDEPOSIT = 'fsdeposit',
  PROMOPAYOUT = 'promopayout',
}

export enum TransactionChannel {
  WEB = 'web',
  MOBILE = 'mobile',
}

@Entity('relax_transactions')
export class RelaxTransaction {
  @ApiProperty({ description: 'The unique identifier of the transaction' })
  @PrimaryGeneratedColumn({ type: 'bigint' }) // bigint is faster, more compact and has better indexing performance than uuid
  id: string; // it is okay to use string here, because API expects transaction ID to be a string, and TypeORM converts bigint to strings anyway

  @ApiProperty({
    description: 'Balance before the transaction as 1/100 of currency',
    example: 10000,
  })
  @Column({ type: 'bigint', transformer: numberTransformer })
  balance_before: number;

  @ApiProperty({
    description: 'Balance after the transaction as 1/100 of currency',
    example: 9000,
  })
  @Column({ type: 'bigint', transformer: numberTransformer })
  balance_after: number;

  @ApiProperty({
    description:
      'Balance difference as 1/100 of currency, positive for deposits and rollbacks, negative for withdrawals',
    example: -1000,
  })
  @Column({ type: 'bigint', transformer: numberTransformer })
  balance_diff: number;

  @ApiProperty({
    description: 'Error code, for example "INSUFFICIENT_FUNDS"',
    example: 'INSUFFICIENT_FUNDS',
    nullable: true,
  })
  @Column({ nullable: true })
  errorcode: string;

  @ApiProperty({
    description:
      'Error message, for example "There are insufficient funds to go through with the withdrawal."',
    example: 'There are insufficient funds to go through with the withdrawal.',
    nullable: true,
  })
  @Column({ nullable: true })
  errormessage: string;

  @ApiProperty({
    description: 'Transaction action: withdraw, deposit, or rollback',
    enum: TransactionAction,
    example: 'withdraw',
  })
  @Column({
    type: 'enum',
    enum: TransactionAction,
  })
  action: TransactionAction;

  @ApiProperty({
    description: 'Product identifier, casino for casino games',
    example: 'casino',
    nullable: true,
  })
  @Column({ nullable: true })
  gameid: string;

  @ApiProperty({
    description: 'Player identifier from operator in response of verifyToken',
    example: '2d63516e-496c-4ac7-a8c3-233723735c59',
  })
  @Column()
  customerid: string;

  @ApiProperty({
    description: 'Round identifier or free round set identifier',
    example: 'round-123456',
    nullable: true,
  })
  @Column({ nullable: true })
  gamesessionid: string;

  @ApiProperty({
    description:
      'Game identifier, <gameid> for Relax platform games or rlx.<platformref>.<studioref>.<gameid> for Plat-to-Plat games',
    example: 'rlx.platform.studio.game123',
    nullable: true,
  })
  @Column({ nullable: true })
  gameref: string;

  @ApiProperty({
    description: 'Game device. Possible values: web for desktop games, mobile for mobile games',
    enum: TransactionChannel,
    example: 'web',
    nullable: true,
  })
  @Column({
    type: 'enum',
    enum: TransactionChannel,
    nullable: true,
  })
  channel: TransactionChannel;

  @ApiProperty({
    description: 'Operator specified string in game launcher, for example the device',
    example: 'mobile-android',
    nullable: true,
  })
  @Column({ nullable: true })
  clientid: string;

  @ApiProperty({
    description: "Player's currency as a three-letter code (ISO 4217)",
    example: 'GC.',
  })
  @Column({ length: 3 })
  currency: string;

  @ApiProperty({
    description: 'Authentication key from the response of endpoint verifyToken',
    example: 'auth_key_example_123456789',
    nullable: true,
  })
  @Column({ nullable: true })
  cashiertoken: string;

  @ApiProperty({
    description: 'Relax transaction identifier',
    example: 123456789,
  })
  @Column({ type: 'bigint', transformer: numberTransformer })
  // idepmotency check and rollback are two scenarios interested in txid,
  // and they both are only interested in successful transactions
  @Index({ where: 'errorcode IS NULL' })
  txid: number;

  @ApiProperty({
    description: 'Transaction amount as 1/100 of currency',
    example: 1000,
  })
  @Column({ type: 'bigint', transformer: numberTransformer })
  amount: number;

  @ApiProperty({
    description: 'Transaction type',
    enum: TransactionType,
    example: 'withdraw',
    nullable: true,
  })
  @Column({
    type: 'enum',
    enum: TransactionType,
    nullable: true,
  })
  txtype: TransactionType;

  @ApiProperty({
    description: 'If the game round has ended then true, otherwise false',
    example: true,
    nullable: true,
  })
  @Column({ nullable: true })
  ended: boolean;

  @ApiProperty({
    description: 'List of jackpot contributions',
    type: 'array',
    example: [
      [1, 10],
      [2, 20],
    ],
    nullable: true,
  })
  @Column({ type: 'json', nullable: true })
  jpcontribution: number[][];

  @ApiProperty({
    description: 'If withdraw is for a buy feature then true, otherwise false',
    example: false,
    nullable: true,
  })
  @Column({ nullable: true })
  buyfeature: boolean;

  @ApiProperty({
    description: 'Promotional code set in endpoints freespins/add and featuretriggers/add',
    example: 'PROMO123',
    nullable: true,
  })
  @Column({ nullable: true })
  promocode: string;

  @ApiProperty({
    description: 'List of jackpot payouts',
    type: 'array',
    example: [
      [1, 1000],
      [2, 2000],
    ],
    nullable: true,
  })
  @Column({ type: 'json', nullable: true })
  jackpotpayout: number[][];

  @ApiProperty({
    description: 'Identification for a promotion with prefix rlx.<platform>',
    example: 'rlx.platform',
    nullable: true,
  })
  @Column({ nullable: true })
  promotionid: string;

  @ApiProperty({
    description: 'Relax transaction identifier for the transaction to rollback',
    example: 123456789,
    nullable: true,
  })
  @Column({ type: 'bigint', nullable: true })
  originaltxid: number;

  @ApiProperty({
    description: 'Timestamp when the transaction was created',
    example: '2023-01-01T12:00:00Z',
  })
  @CreateDateColumn()
  created_at: Date;
}
