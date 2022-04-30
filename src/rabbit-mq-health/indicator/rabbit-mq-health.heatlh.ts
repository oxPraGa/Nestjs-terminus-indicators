import { Injectable } from "@nestjs/common";
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from "@nestjs/terminus";
import * as AmqpLib from "amqplib/callback_api";

@Injectable()
export class RabbitMqHealthIndicator extends HealthIndicator {
  constructor() {
    super();
  }

  async checkHealth(key: any, options: any): Promise<HealthIndicatorResult> {
    try {
      const rmqConnection: any = await this.connectRmq();
      rmqConnection.close();
      return this.getStatus(key, true);
    } catch (e) {
      if (options.required)
        throw new HealthCheckError(
          "Error",
          this.getStatus(key, false, { message: "Rmq not working" })
        );
      else return this.getStatus(key, false);
    }
  }

  private async connectRmq(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      /* AmqpLib.connect(
				this.configService.get<string>('rmq.uri'),
				{},
				(err, connection) => {
					if (err) {
						reject(err);
					}
					resolve(connection);
				}
			); */
    });
  }
}
