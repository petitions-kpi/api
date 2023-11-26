import { Module } from '@nestjs/common';
import { AuthModule } from './api/modules/auth.module';
import { MailModule } from './api/modules/mail.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [
    AuthModule,
    MailModule,
    PrismaModule,
  ],
})
export class AppModule {}
