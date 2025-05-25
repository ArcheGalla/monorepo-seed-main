import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelaxModule } from './relax/relax.module';
import { LoggerModule, ContextLogger } from './relax/common/logger';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    // Configure environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Logger module (must be before TypeORM to be available for injection)
    LoggerModule,

    // Serve static files from /docs folder
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'docs'),
      serveRoot: '/docs',
      exclude: ['/api*'],
    }),

    // Configure TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, LoggerModule],
      inject: [ConfigService, ContextLogger],
      useFactory: (configService: ConfigService) => {
        const logger = new ContextLogger('TypeORM');

        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
          logging: configService.get('NODE_ENV') === 'development',
          logger: {
            log: (level, message) => {
              switch (level) {
                case 'log':
                case 'info':
                  logger.log(message);
                  break;
                case 'warn':
                  logger.warn(message);
                  break;
                default:
                  logger.log(message);
              }
            },
            logQuery: (query, parameters) => {
              logger.log('Database query', {
                query,
                parameters,
              });
            },
            logQueryError: (error, query, parameters) => {
              const errorMessage = error instanceof Error ? error.message : error;
              const errorStack = error instanceof Error ? error.stack : undefined;

              logger.error('Database query error', {
                error: errorMessage,
                stack: errorStack,
                query,
                parameters,
              });
            },
            logQuerySlow: (time, query, parameters) => {
              logger.warn('Slow database query', {
                time,
                query,
                parameters,
              });
            },
            logMigration: message => {
              logger.log('Database migration', { message });
            },
            logSchemaBuild: message => {
              logger.log('Database schema build', { message });
            },
          },
          // Make the connection optional for development
          retryAttempts: 5,
          retryDelay: 3000,
        };
      },
    }),

    // Feature modules
    RelaxModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
