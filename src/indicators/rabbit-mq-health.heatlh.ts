import { Injectable } from "@nestjs/common";
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from "@nestjs/terminus";
import * as AmqpLib from "amqplib/callback_api";

/**
 * The options for the `RabbitMqHealthIndicator`
 */
export type RabbitMqHealthIndicatorOptions = {
  rmqUri: string;
  timeout?: number;
  required: boolean;
};

@Injectable()
export class RabbitMqHealthIndicator extends HealthIndicator {
  constructor() {
    super();
  }

  async checkHealth(
    key: any,
    options: RabbitMqHealthIndicatorOptions
  ): Promise<HealthIndicatorResult> {
    try {
      const rmqConnection: any = await this.connectRmq(
        options.rmqUri,
        options.timeout
      );
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

  private async connectRmq(uri: string, timeout: number = 2000): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      AmqpLib.connect(uri, { timeout: 2000 }, (err: any, connection: any) => {
        if (err) {
          reject(err);
        }
        resolve(connection);
      });
    });
  }
}
