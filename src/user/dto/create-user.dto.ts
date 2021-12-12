import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名必填' })
  readonly username: string;

  @IsString()
  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码必填' })
  readonly password: string;

  // @IsString()
  @ApiPropertyOptional({ description: '昵称' })
  readonly nickname: string;

  // @IsString()
  @ApiPropertyOptional({ description: '头像' })
  readonly avatar: string;

  // @IsString()
  @ApiPropertyOptional({ description: '邮箱' })
  readonly email: string;
}
