import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

enum Channel {
  WEB = 'web',
  MOBILE = 'mobile',
}

export class GetBalanceRequestDto {
  @ApiProperty({
    description: 'Player identifier from operator in response of verifyToken.',
    example: '2d63516e-496c-4ac7-a8c3-233723735c59',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  customerid: string;

  @ApiProperty({
    description: 'Authentication key from the response of endpoint verifyToken.',
    example: 'auth_key_example_123456789',
    required: false,
  })
  @IsOptional()
  @IsString()
  cashiertoken?: string;

  @ApiProperty({
    description: "Player's currency as a three-letter code.",
    example: 'GC.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiProperty({
    description:
      'Game identifier, <gameid> for Relax platform games or rlx.<platformref>.<studioref>.<gameid> for Plat-to-Plat games.',
    example: 'rlx.platform.studio.game123',
    required: false,
  })
  @IsOptional()
  @IsString()
  gameref?: string;

  @ApiProperty({
    description: 'Game device. Possible values: web for desktop games, mobile for mobile games.',
    enum: Channel,
    example: 'web',
    required: false,
  })
  @IsOptional()
  @IsEnum(Channel)
  channel?: string;
}
