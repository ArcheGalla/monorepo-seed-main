import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID, Length, MaxLength } from 'class-validator';

export class VerifyTokenResponseDto {
  @ApiProperty({
    description: 'Player identifier from operator, used in other endpoints.',
    example: '2d63516e-496c-4ac7-a8c3-233723735c59',
    format: 'uuid',
    maxLength: 36,
  })
  @IsNotEmpty()
  @IsUUID()
  customerid: string;

  @ApiProperty({
    description: "Player's country, ISO 3166-1 alpha-2.",
    example: 'DE',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  countrycode: string;

  @ApiProperty({
    description: 'Authentication key for all other endpoints except rollback.',
    example: '2d63516e-496c-4ac7-a8c3-233723735c59',
    format: 'uuid',
    maxLength: 36,
  })
  @IsNotEmpty()
  @IsUUID()
  cashiertoken: string;

  @ApiProperty({
    description: "Player's currency as a three-letter code (ISO 4217).",
    example: 'GC.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  customercurrency: string;

  @ApiProperty({
    description: 'Balance in 1/100 of currency, for example EUR: 100 = 1 EUR.',
    example: 10000,
  })
  @IsNotEmpty()
  @IsInt()
  balance: number;

  @ApiProperty({
    description: 'Player jurisdiction, used to configure jurisdiction-specific features.',
    example: 'DE',
  })
  @IsNotEmpty()
  @IsString()
  jurisdiction: string;
}
