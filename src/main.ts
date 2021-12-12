import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';

/**
 * 	应用程序的入口文件，它使用核心函数 NestFactory 来创建 Nest 应用程序的实例。
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('mobile-api'); // 设置全局路由前缀
  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('LEVI API说明文档')
    .setDescription(
      "<a href='http://localhost:8080/swagger/'>http://localhost:8080/swagger/</a>",
    )
    .setVersion('10.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // 全局注册一下管道ValidationPipe
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8080);
}
bootstrap();
