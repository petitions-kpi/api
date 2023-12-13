import { Module } from '@nestjs/common';
import { AuthModule } from './api/modules/auth.module';
import { MailModule } from './api/modules/mail.module';
import { PrismaModule } from './database/prisma.module';
import { AccessModule } from './api/modules/access.module';
import { PetitionModule } from './api/modules/petition.module';

@Module({
  imports: [
    AuthModule,
    MailModule,
    PrismaModule,
    AccessModule,
    PetitionModule,
  ],
})
export class AppModule {}
