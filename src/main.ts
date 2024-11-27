import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
// import helmet from 'helmet';
import { initializeTransactionalContext } from 'typeorm-transactional';


async function bootstrap() {
  initializeTransactionalContext()
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform:true,
    transformOptions:{
      enableImplicitConversion:true,
    }
  }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get (Reflector)));
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
