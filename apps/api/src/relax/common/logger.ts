import { Module } from '@nestjs/common';
import {
  ContextLogger,
  ContextLoggerModule as BaseContextLoggerModule,
} from 'nestjs-context-logger';

/**
 * Logger module that provides the ContextLogger and configures ContextLoggerModule
 */
@Module({
  imports: [
    BaseContextLoggerModule.forRoot({
      // Configure context logger
      enrichContext: async context => ({
        // Add global context properties here
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
      }),
      groupFields: {
        bindingsKey: 'data', // Groups runtime bindings
        contextKey: 'meta', // Groups request data
      },
    }),
  ],
  providers: [ContextLogger],
  exports: [ContextLogger, BaseContextLoggerModule],
})
export class LoggerModule {}

// Re-export ContextLogger for convenience
export { ContextLogger } from 'nestjs-context-logger';
