import { Controller, MessageEvent, Sse } from '@nestjs/common';
import { catchError, interval, map, Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {

  constructor(private readonly notificationService: NotificationService) {}

  @Sse('events')
  getNotifications(): Observable<MessageEvent> {
    // return interval(2000).pipe(
    //   map((data) => ({
    //     data: `Data: ${data}`,
    //   })),
    //   catchError(err => of({data: err}))
    // )
    return this.notificationService.getStream().pipe(
      map((data) => ({ data })),
    )
  }
}
