import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('relax_tokens')
export class RelaxToken {
  @ApiProperty({
    description: 'The unique identifier of the token record',
    example: '1',
    nullable: false,
  })
  @PrimaryGeneratedColumn({ type: 'bigint' }) // bigint is faster, more compact and has better indexing performance than uuid
  id: string;

  @ApiProperty({
    description: 'The unique identifier of the player',
    example: '798b58f7-fc0d-4805-b048-858627746de4',
    format: 'uuid',
    maxLength: 36,
    nullable: false,
  })
  @Column({ type: 'uuid', nullable: false })
  player: string;

  @ApiProperty({
    description: 'Game identifier',
    example: 'moneytrain4',
    nullable: false,
  })
  @Column({ length: 1024, nullable: false })
  gameid: string;

  @ApiProperty({
    description: 'Unique short-lived token for game session',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    maxLength: 36,
    nullable: false,
  })
  //  verifyToken serches by ticket (token), and ticket_claimed_at IS NULL,
  @Index({ unique: true })
  @Column({ type: 'uuid', nullable: false })
  ticket: string;

  @ApiProperty({
    description: 'Authentication key for cashier operations',
    example: '440e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    maxLength: 36,
    nullable: false,
  })
  // withdraw operation searches by cashiertoken + gameid (gameref) + player (customerid)
  @Index({ unique: true })
  @Column({ type: 'uuid', nullable: false })
  cashiertoken: string;

  @ApiProperty({
    description:
      "Player's country, ISO 3166-1 alpha-2. Disables features for jurisdictions in the game engine.",
    example: 'US',
    nullable: false,
  })
  @Column({ length: 2, nullable: false })
  countrycode: string;

  @ApiProperty({
    description: 'Player jurisdiction, used to configure jurisdiction-specific features.',
    example: 'US',
    maxLength: 5,
    nullable: false,
  })
  @Column({ length: 5, nullable: false })
  jurisdiction: string;

  @ApiProperty({
    description: "Player's currency as a three-letter code (ISO 4217).",
    example: 'GC.',
    nullable: false,
  })
  @Column({ length: 3, nullable: false })
  customercurrency: string;

  @ApiProperty({
    description: 'Timestamp when the token was created',
    example: '2023-01-01T12:00:00Z',
    nullable: false,
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty({
    description: 'Timestamp when the ticket was claimed',
    example: '2023-01-01T12:00:00Z',
    nullable: true,
  })
  @Column({ type: 'timestamp', nullable: true })
  ticket_claimed_at: Date;
}
