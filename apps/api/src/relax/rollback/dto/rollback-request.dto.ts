import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class RollbackRequestDto {
  @ApiProperty({
    description: 'Player identifier from operator in response of verifyToken',
    example: '2d63516e-496c-4ac7-a8c3-233723735c59',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  customerid: string;

  @ApiProperty({
    description: 'Relax transaction identifier for rollback call',
    example: 123456789,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  txid: number;

  @ApiProperty({
    description: 'Relax transaction identifier for the transaction to rollback',
    example: 123456789,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  originaltxid: number;

  @ApiProperty({
    description: 'Round identifier',
    example: 'round-123456',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  gamesessionid: string;
}
