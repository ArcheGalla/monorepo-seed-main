import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { numberTransformer } from '../common/transformers';

@Entity('relax_wallets')
// wallets are usually looked up by player_id + currency
@Index(['player_id', 'currency'], { unique: true })
export class RelaxWallet {
  @ApiProperty({ description: 'The unique identifier of the wallet' })
  @PrimaryGeneratedColumn('uuid') // wallets are not write-heavy, so uuid is OK
  id: string;

  @ApiProperty({
    description: 'Balance in 1/100 of currency, for example EUR: 100 = 1 EUR.',
    example: 10000,
    default: 0,
  })
  // The standard "integer" type in PostgreSQL is much smaller than JavaScript's safe integer limit.
  // That's why it is okay to have bigint in Postres but still cast it to JS integer.
  @Column({ type: 'bigint', default: 0, transformer: numberTransformer })
  balance: number;

  @ApiProperty({
    description: 'Currency code, either "GC." (Game Credits) or "SC." (Special Credits)',
    example: 'GC.',
    maxLength: 3,
  })
  @Column({ length: 3 })
  currency: string;

  @ApiProperty({
    description: 'Whether the wallet balance is redeemable',
    example: true,
    default: false,
  })
  @Column({ default: false })
  redeemable: boolean;

  @ApiProperty({
    description: 'The player this wallet belongs to',
    example: '798b58f7-fc0d-4805-b048-858627746de4',
  })
  @Column({ type: 'uuid' })
  player_id: string;

  @ApiProperty({
    description: 'Timestamp when the wallet was last updated',
    example: '2023-01-01T12:00:00Z',
  })
  @UpdateDateColumn()
  updated_at: Date;
}
