/*
https://docs.nestjs.com/exception-filters#exception-filters-1
*/

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import * as fs from 'fs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const logger = new Logger('AllExceptionsFilter');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMsg =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception['message'] || exception['response'] || exception || 'Critical error in server';

    const errorResponse = {
      statusCode: status,
      message: errorMsg.message || errorMsg || 'Critical error in server',
      timestamp: new Date().toISOString(),
      currentId: request['X-Correlation-Id'],
      path: request.url,
      method: request.method,
    }

    const errorLog = `Response Code: ${errorResponse.statusCode} - Method: ${errorResponse.method} - Path: ${errorResponse.path} - Message: ${JSON.stringify(errorMsg)} - Timestamp: ${errorResponse.timestamp} - CorrelationId: ${errorResponse.currentId}`;

    logger.error(errorLog);
    
    fs.appendFile('logs/error.log', `${errorLog}\n`, 'utf8', (err) => {
      if (err) throw err;
    });


    response.status(status).json(errorResponse);
  }
}
