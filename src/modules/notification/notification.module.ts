import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { NotificationController } from './notification.controller';

@Module({})
export class NotificationModule {
  controllers: [ NotificationController ]
  providers: [ AuthService ]
}
