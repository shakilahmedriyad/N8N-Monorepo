import { Module } from '@nestjs/common';

import { TRPCModule } from 'nestjs-trpc';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WorkflowModule } from './workflow/workflow.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from '@repo/auth/auth';
import { BullModule } from '@nestjs/bullmq';
import { TrpcContextProvider } from './common/context/trpc-context.provider';
import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { AuthMiddleware } from './common/middleware/auth.middlware';
import { FeatureModule } from './feature/feature.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import superjson from 'superjson';
import { GoogleFormModule } from './webhooks/google-form/google-form.module';
import { ExecutionModule } from './execution/execution.module';
const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    /**
     * initialize Better auth for authentication
     **/

    AuthModule.forRoot({ auth }),
    WorkflowModule,

    /**
     * initialize Config module
     **/
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),

    /**
     * initialize Trpc
     **/
    TRPCModule.forRoot({
      basePath: '/api/trpc',
      transformer: superjson,
      context: TrpcContextProvider,
      globalMiddlewares: [AuthMiddleware],
    }),

    /**
     * initialize BullMq for background jobs
     **/
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter, // Or FastifyAdapter from `@bull-board/fastify`
    }),
    FeatureModule,
    WebhooksModule,
    GoogleFormModule,
    ExecutionModule,
  ],
  controllers: [],
  providers: [TrpcContextProvider, AuthMiddleware],
})
export class AppModule {}
