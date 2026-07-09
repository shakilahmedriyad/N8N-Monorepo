import { Module } from '@nestjs/common';
import { GoogleFormModule } from './google-form/google-form.module';

@Module({
  imports: [GoogleFormModule],
})
export class WebhooksModule {}
