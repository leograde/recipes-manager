import { NestFactory } from '@nestjs/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Server } from 'http';
import * as express from 'express';
import { createServer, proxy } from 'aws-serverless-express';

import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

async function bootstrapServer(): Promise<Server> {
  const expressApp = express();
  const expressAdapter = new ExpressAdapter(expressApp);
  const nestApp = await NestFactory.create(AppModule, expressAdapter);
  nestApp.enableCors();
  await nestApp.init();
  return createServer(expressApp);
}

let cachedServer: Server;
export async function handler(
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }

  return proxy(cachedServer, event, context, 'PROMISE').promise;
}
