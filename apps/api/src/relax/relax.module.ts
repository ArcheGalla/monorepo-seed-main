import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LoggerModule } from './common/logger';
import { CorsMiddleware } from './common/cors.middleware';
import { VerifyTokenController } from './verify-token/verify-token.controller';
import { VerifyTokenService } from './verify-token/verify-token.service';
import { LaunchController } from './launch/launch.controller';
import { LaunchService } from './launch/launch.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { BasicAuthGuard } from './auth/basic-auth.guard';
import { GetBalanceController } from './get-balance/get-balance.controller';
import { GetBalanceService } from './get-balance/get-balance.service';
import { WithdrawController } from './withdraw/withdraw.controller';
import { WithdrawService } from './withdraw/withdraw.service';
import { DepositController } from './deposit/deposit.controller';
import { DepositService } from './deposit/deposit.service';
import { RollbackController } from './rollback/rollback.controller';
import { RollbackService } from './rollback/rollback.service';
import { RelaxToken, RelaxWallet, RelaxTransaction } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([RelaxToken, RelaxWallet, RelaxTransaction]),
    ConfigModule,
    LoggerModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<number>('JWT_LIFETIME_MINUTES')}m`,
        },
      }),
    }),
  ],
  controllers: [
    VerifyTokenController,
    LaunchController,
    AuthController,
    GetBalanceController,
    WithdrawController,
    DepositController,
    RollbackController,
  ],
  providers: [
    VerifyTokenService,
    LaunchService,
    AuthService,
    JwtStrategy,
    BasicAuthGuard,
    GetBalanceService,
    WithdrawService,
    DepositService,
    RollbackService,
  ],
})
export class RelaxModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply CORS middleware only to the launch endpoint
    consumer
      .apply(CorsMiddleware)
      .forRoutes({ path: 'api/relax/launch', method: RequestMethod.ALL });
  }
}
