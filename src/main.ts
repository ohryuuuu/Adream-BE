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
    whitelist: true, // DTO에 정의되지 않은 프로퍼티는 자동으로 필터링
    forbidNonWhitelisted: true, // DTO에 없는 프로퍼티가 들어오면 에러 발생
    transformOptions:{
      enableImplicitConversion:true,
    }
  }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get (Reflector)));
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
