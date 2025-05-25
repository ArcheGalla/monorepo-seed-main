import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LaunchResponseDto {
  @ApiProperty({
    description: 'Parameters for the game launcher in GET parameters format',
    example: 'gameid=moneytrain4&channel=web&moneymode=fun&partner=relax&partnerid=1',
  })
  @IsNotEmpty()
  @IsString()
  gameUrl: string;
}
