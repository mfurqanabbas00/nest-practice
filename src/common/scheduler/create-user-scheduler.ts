import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class CreateUserScheduler {
  private readonly loggerSerive = new Logger(CreateUserScheduler.name);

  // @Cron('45 * * * * *')
  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    // this.loggerSerive.debug('Called when the second is 45');
    this.loggerSerive.debug('Called every 10 second');
  }

}