import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum Channel {
  WEB = 'web',
  MOBILE = 'mobile',
}

export class LaunchRequestDto {
  @ApiProperty({
    description: 'Game identifier',
    example: 'moneytrain4',
  })
  @IsNotEmpty()
  @IsString()
  gameid: string;

  @ApiProperty({
    description: 'Game device. Possible values: web for desktop games, mobile for mobile games.',
    enum: Channel,
    example: 'web',
  })
  @IsNotEmpty()
  @IsEnum(Channel)
  channel: string;

  @ApiProperty({
    description: 'Currency code, either "GC." (Game Credits) or "SC." (Special Credits)',
    example: 'GC.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  currency: string;
}
