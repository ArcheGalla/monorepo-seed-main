import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { ContextLogger } from 'nestjs-context-logger';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  private readonly logger = new ContextLogger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const { body, headers, params, query } = req;

    // Log request
    this.logger.log('HTTP Request', {
      body,
      params,
      query,
      headers: this.sanitizeHeaders(headers),
    });

    const now = Date.now();
    return next.handle().pipe(
      tap({
        next: (data: any) => {
          // Log response
          const res = context.switchToHttp().getResponse<Response>();
          this.logger.log('HTTP Response', {
            status: res.statusCode,
            responseTime: `${Date.now() - now}ms`,
            response: data,
          });
          // res.header('X-Correlation-ID', ContextLogger.getContext().correlationId);
        },
        error: (error: any) => {
          // Log error
          this.logger.error('HTTP Error Response', {
            status: error.response.statusCode,
            responseTime: `${Date.now() - now}ms`,
            response: error.response,
            message: error.message,
            exception: error.name,
            trace: this.improveStackTrace(error.stack),
          });
          // error.response.header('X-Correlation-ID', ContextLogger.getContext().correlationId);
        },
      }),
    );
  }

  private sanitizeHeaders(headers: any): any {
    const sanitized = { ...headers };
    // Hide sensitive headers
    const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key'];
    sensitiveHeaders.forEach(header => {
      if (sanitized[header]) {
        sanitized[header] = '[REDACTED]';
      }
    });
    const deleteHeaders = ['connection', 'content-length'];
    deleteHeaders.forEach(header => {
      if (sanitized[header]) {
        delete sanitized[header];
      }
    });
    return sanitized;
  }

  private improveStackTrace(stack: string): string {
    // remove project root path from stack trace
    const projectRootPath = process.cwd();
    return stack.replaceAll(projectRootPath, '');
  }
}
