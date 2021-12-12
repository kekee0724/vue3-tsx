import { Controller, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

/**
 * 单个路由的基本控制器(Controller)
 * @Controller装饰器来定义控制器
 * 主路径为 app
 */
@ApiTags('通用接口')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * @Get是请求方法的装饰器
   * 1. 固定路径：
   * 可以匹配到 get请求，http://localhost:8080/app/list
   * @returns string
   */
  @Get('list')
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * 可以匹配到 post请求，http://localhost:9080/app/list
   * @returns list
   */
  @Post('list')
  create(): string {
    return this.appService.getHello();
  }

  /**
   * 2.通配符路径(?+* 三种通配符 )
   * 可以匹配到 get请求, http://localhost:9080/app/user_xxx
   * @returns user
   */
  @Get('user_*')
  getUser() {
    return 'getUser';
  }

  @Put('list/user')
  updateUser() {
    return { userId: 1 };
  }

  /**
   * 3.带参数路径
   * 可以匹配到put请求，http://localhost:9080/app/list/xxxx
   * @returns details
   */
  @Put('list/:id')
  update() {
    return 'update';
  }
}
