import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.auth';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: `${process.env.JWT_SECRET}`,
    signOptions: { expiresIn: '10h' }
  })],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
