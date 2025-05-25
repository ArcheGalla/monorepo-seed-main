import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LaunchRequestDto } from './dto/launch-request.dto';
import { LaunchResponseDto } from './dto/launch-response.dto';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { LaunchService } from './launch.service';
import { ContextLogger } from 'nestjs-context-logger';

@ApiTags('Launch API')
@ApiBearerAuth()
@Controller('api/relax')
export class LaunchController {
  private readonly logger = new ContextLogger(LaunchController.name);

  constructor(private readonly launchService: LaunchService) {}

  @Post('launch')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Launch a game. Requires JWT token with the correct player information.',
  })
  @ApiBody({ type: LaunchRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Game URL generated successfully',
    type: LaunchResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request parameters',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: ErrorResponseDto,
  })
  async launch(
    @Request() req,
    @Body() launchRequestDto: LaunchRequestDto,
  ): Promise<LaunchResponseDto> {
    this.logger.log('Received launch request', {
      user: req.user,
      gameid: launchRequestDto.gameid,
      channel: launchRequestDto.channel,
    });

    // Delegate to the service
    const response = await this.launchService.launchGame(launchRequestDto, req.user);

    this.logger.log('Sending launch response', {
      gameUrl: response.gameUrl,
    });

    return response;
  }
}
