import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

enum Channel {
  WEB = 'web',
  MOBILE = 'mobile',
}

enum TxType {
  WITHDRAW = 'withdraw',
  FSWITHDRAW = 'fswithdraw',
}

export class WithdrawRequestDto {
  @ApiProperty({
    description: 'Product identifier, casino for casino games',
    example: 'casino',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  gameid: string;

  @ApiProperty({
    description: 'Player identifier from operator in response of verifyToken',
    example: '2d63516e-496c-4ac7-a8c3-233723735c59',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  customerid: string;

  @ApiProperty({
    description: 'Round identifier',
    example: 'round-123456',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  gamesessionid: string;

  @ApiProperty({
    description:
      'Game identifier, <gameid> for Relax platform games or rlx.<platformref>.<studioref>.<gameid> for Plat-to-Plat games',
    example: 'rlx.platform.studio.game123',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  gameref: string;

  @ApiProperty({
    description: 'Game device. Possible values: web for desktop games, mobile for mobile games',
    enum: Channel,
    example: 'web',
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(Channel)
  channel: string;

  @ApiProperty({
    description: 'Operator specified string in game launcher, for example the device',
    example: 'mobile-android',
    required: true,
  })
  @IsString()
  clientid: string;

  @ApiProperty({
    description: "Player's currency as a three-letter code (ISO 4217)",
    example: 'GC.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiProperty({
    description: 'Authentication key from the response of endpoint verifyToken',
    example: 'auth_key_example_123456789',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  cashiertoken: string;

  @ApiProperty({
    description: 'Relax transaction identifier',
    example: 123456789,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  txid: number;

  @ApiProperty({
    description: 'Withdraw amount as 1/100 of currency',
    example: 1000,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  amount: number;

  @ApiProperty({
    description:
      'Transaction type, value withdraw except when free rounds and feature triggers use separate withdraw/deposit calls',
    enum: TxType,
    example: 'withdraw',
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(TxType)
  txtype: string;

  @ApiProperty({
    description: 'If the game round has ended then true, otherwise false',
    example: true,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  ended: boolean;

  @ApiProperty({
    description: 'List of jackpot contributions',
    type: [Array],
    example: [
      [1, 10],
      [2, 20],
    ],
    required: false,
  })
  @IsOptional()
  @IsArray()
  jpcontribution?: number[][];

  @ApiProperty({
    description: 'If withdraw is for a buy feature then true, otherwise false',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  buyfeature?: boolean;

  @ApiProperty({
    description: 'Promotional code set in endpoints freespins/add and featuretriggers/add',
    example: 'PROMO123',
    required: false,
  })
  @IsOptional()
  @IsString()
  promocode?: string;
}
