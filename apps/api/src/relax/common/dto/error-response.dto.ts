import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Error code',
    example: 'INVALID_TOKEN',
  })
  @IsNotEmpty()
  @IsString()
  errorcode: string;

  @ApiProperty({
    description: 'Error message',
    example: 'The provided token is invalid or expired',
  })
  @IsNotEmpty()
  @IsString()
  errormessage: string;
}
