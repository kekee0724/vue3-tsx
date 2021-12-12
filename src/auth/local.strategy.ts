import { compareSync } from 'bcryptjs';
import { IStrategyOptions, Strategy } from 'passport-local';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

import { BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from './auth.service';

export class LocalStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username=:username', { username })
      .getOne();

    if (!user) {
      throw new BadRequestException('用户名不正确！');
    }

    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码错误！');
    }

    const token = this.authService.login(user);
    // return { ...user, ...token };
    return token;
  }
}
