import { Module } from "@nestjs/common";
import { RabbitMqHealthIndicator } from "./rabbit-mq-health.heatlh";

@Module({
  exports: [RabbitMqHealthIndicator],
  providers: [RabbitMqHealthIndicator],
})
export class IndicatorsModule {}
