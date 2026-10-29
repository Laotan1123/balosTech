import "./instrument";
import { NestFactory } from "@nestjs/core";
import { HttpAdapterHost } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { SentryExceptionFilter } from "./sentry-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true, rawBody: true });
  app.setGlobalPrefix("api");
  app.useGlobalFilters(new SentryExceptionFilter(app.get(HttpAdapterHost)));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );
  app.enableShutdownHooks();
  const port = process.env.PORT ? Number(process.env.PORT) : 4000;
  await app.listen(port);
  Logger.log(`API listening on port ${port}`, "Bootstrap");
}

bootstrap().catch((error: unknown) => {
  const logger = new Logger("Bootstrap");
  if (error instanceof Error) {
    logger.error("API failed to start.", error.stack);
  } else {
    logger.error("API failed to start due to an unknown error.");
  }
  process.exitCode = 1;
});
