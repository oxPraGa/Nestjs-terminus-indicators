import { Module } from "@nestjs/common";
import { RabbitMqHealthIndicator } from "./indicator/rabbit-mq-health.heatlh";

@Module({
  exports: [RabbitMqHealthIndicator],
  providers: [RabbitMqHealthIndicator],
})
export class RabbitMqHealthModule {}
