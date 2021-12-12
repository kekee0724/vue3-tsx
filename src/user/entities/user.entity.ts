import * as bcrypt from 'bcryptjs';
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity('user')
export class User {
  /**
   * @PrimaryGeneratedColumn('uuid')创建一个主列id，该值将使用uuid自动生成。Uuid 是一个独特的字符串
   */
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 100 })
  username: string; // 用户名

  @Column({ length: 100, default: '' })
  nickname: string; //昵称

  /**
   * select: false表示隐藏此列
   * 使用class-transformer提供的Exclude来序列化，对返回的数据实现过滤掉password字段的效果
   */
  @Exclude()
  @Column({ select: false })
  password: string; // 密码

  @Column({ default: '' })
  avatar: string; //头像

  @Column({ default: '' })
  email: string;

  /**
   * 博客系统设置了三种角色root、autor和 visitor,
   * root有所以权限，author有写文章权限，visitor只能阅读文章，
   * 注册的用户默认是visitor,root权限的账号可以修改用户角色
   */
  @Column('simple-enum', {
    enum: ['root', 'author', 'visitor'],
    default: 'visitor',
  })
  role: string; // 用户角色

  /**
   * 实现字段名驼峰转下划线命名
   */
  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  /**
   * 使用了装饰器@BeforeInsert来装饰encryptPwd方法
   * 表示该方法在数据插入之前调用，这样就能保证插入数据库的密码都是加密后的
   */
  @BeforeInsert()
  async encryptPwd() {
    // console.log(bcrypt);
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(this.password, salt);
    this.password = hash;
  }
}
