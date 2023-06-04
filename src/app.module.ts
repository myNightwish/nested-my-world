import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
// import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { config } from 'dotenv';
import * as fs from 'fs';

// 检查是否存在 .env 文件
if (!fs.existsSync('.env')) {
  console.error('.env 文件不存在');
  process.exit(1);
}

// 加载 .env 文件
config();

const databaseConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const isProd = process.env.NODE_ENV == 'production';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: [isProd ? path.resolve('.env.prod') : path.resolve('.env')],
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      autoLoadEntities: true,
      //是否自动同步实体文件,生产环境建议关闭
      synchronize: !isProd,
      ...databaseConfig,
    }),
    UserModule,
    AuthModule,
    TaskModule,
  ],
})
export class AppModule {}
