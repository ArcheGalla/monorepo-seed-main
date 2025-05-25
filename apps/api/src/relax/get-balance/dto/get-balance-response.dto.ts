import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class GetBalanceResponseDto {
  @ApiProperty({
    description: 'Balance in 1/100 of currency, for example EUR: 100 = 1 EUR.',
    example: 10000,
  })
  @IsNotEmpty()
  @IsInt()
  balance: number;

  @ApiProperty({
    description: "Player's currency as a three-letter code.",
    example: 'GC.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  customercurrency: string;
}
