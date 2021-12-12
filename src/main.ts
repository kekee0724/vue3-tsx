import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';

/**
 * 	应用程序的入口文件，它使用核心函数 NestFactory 来创建 Nest 应用程序的实例。
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('mobile-api'); // 设置全局路由前缀
  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(8080);
}
bootstrap();
