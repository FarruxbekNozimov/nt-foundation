import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 7000;
    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
      .setTitle('NT Foundation')
      .setDescription('REST API')
      .setVersion('1.0.0')
      .addTag('NodeJS, NestJS, Postgres, Sequalize')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe())

    app.use((req, res, next) => {
      const startTime = Date.now()
      res.on('finish', () => {
        const endTime = Date.now()
        const responseTime = endTime - startTime
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${responseTime}ms`);
      })
      next();
    })
    app.listen(PORT, () => {
      console.log(`Server ${PORT} da yuguryapti...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
