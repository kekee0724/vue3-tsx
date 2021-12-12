import { User } from 'src/user/entities/user.entity';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStorage } from './local.strategy';

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get('SECRET', 'vgkEeveppBwCzPHr'),
      signOptions: { expiresIn: '4h' },
    };
  },
});
@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule, jwtModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStorage],
  exports: [jwtModule],
})
export class AuthModule {}
