import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

enum Channel {
  WEB = 'web',
  MOBILE = 'mobile',
}

export class VerifyTokenRequestDto {
  @ApiProperty({
    description: 'Game device. Possible values: web for desktop games, mobile for mobile games.',
    enum: Channel,
    example: 'web',
  })
  @IsNotEmpty()
  @IsEnum(Channel)
  channel: string;

  @ApiProperty({
    description:
      'Operator specified string in game launcher, for example the device. This is passed with wallet transactions so it can be used for tracking.',
    example: 'web_windows',
  })
  @IsString()
  clientid: string;

  @ApiProperty({
    description: 'Short-lived authentication token, alphanumeric string with no character limit.',
    example: '440e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsUUID()
  token: string;

  @ApiProperty({
    description:
      'Game identifier, <gameid> for Relax platform games or rlx.<platformref>.<studioref>.<gameid> for Plat-to-Plat games.',
    example: 'rlx.platform.studio.game123',
    required: false,
  })
  @IsOptional()
  @IsString()
  gameref?: string;
}
