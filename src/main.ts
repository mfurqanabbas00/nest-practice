import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strips properties not in DTO
    forbidNonWhitelisted: true, // throws error if extra fields are sent
    transform: true,    // auto-transforms payloads to DTO instances
  }));

  const config = new DocumentBuilder()
  .setTitle("My API Document")
  .setDescription("My API Description")
  .setVersion("1.0")
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);

  Logger.log(`App is running on", ${process.env.PORT ?? 3000}`);

}
bootstrap();
