import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserPostModule } from './post/userPost.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { UserPost } from './post/userPost.entity';
import { ConfigsModule } from './config.module';

@Module({
  imports: [
    ConfigsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, UserPost],
      synchronize: true,
    }),
    UserModule,
    UserPostModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
