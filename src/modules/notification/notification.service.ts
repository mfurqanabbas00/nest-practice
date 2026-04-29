import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Subject } from 'rxjs';

@Injectable()
export class NotificationService {

  private subject = new Subject<any>();


  @OnEvent('auth.register')
  onRegister(payload: any) {
    console.log("Register", this.subject);
    console.log('Subscribers count:', this.subject.observers.length);
    this.subject.next({ type: 'auth.register', ...payload });
  }

  getStream() {
    console.log("This.subject", this.subject);
    return this.subject.asObservable();
  }


}
