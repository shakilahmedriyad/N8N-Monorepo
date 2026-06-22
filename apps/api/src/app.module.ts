import { Module } from '@nestjs/common';

import { TRPCModule } from 'nestjs-trpc';
import { ConfigModule } from '@nestjs/config';
import { WorkflowModule } from './workflow/workflow.module';
import { UserModule } from './user/user.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from '@repo/auth/auth';
import { TrpcContextProvider } from './common/context/trpc-context.provider';
import { AuthMiddleware } from './common/middleware/auth.middlware';
import superjson from 'superjson';
const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    WorkflowModule,
    UserModule,
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
     * initialize Better auth for authentication
     **/

    AuthModule.forRoot({ auth }),
  ],
  controllers: [],
  providers: [TrpcContextProvider, AuthMiddleware],
})
export class AppModule {}
