import { Module } from '@nestjs/common';

import { TRPCModule } from 'nestjs-trpc';
import { WorkflowModule } from './workflow/workflow.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    TRPCModule.forRoot({}),

    /**
     * initialize Prisma asynchronously to use ConfigService for database configuration
     **/
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
