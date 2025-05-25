import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class WithdrawResponseDto {
  @ApiProperty({
    description: 'Balance after the transaction as 1/100 of currency',
    example: 9000,
  })
  @IsNotEmpty()
  @IsInt()
  balance: number;

  @ApiProperty({
    description: 'Relax transaction identifier from the request',
    example: 123456789,
  })
  @IsNotEmpty()
  @IsInt()
  txid: number;

  @ApiProperty({
    description: 'Operator transaction identifier',
    example: '123456789',
  })
  @IsNotEmpty()
  @IsString()
  remotetxid: string;
}
