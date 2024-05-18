import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ){}

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.getUser(username)
    if (!user) return null
    const passwordValid = await bcrypt.compare(password, user.passwordHash)
    if (!user) {
      throw new NotAcceptableException('could not find user')
    }
    if (user && passwordValid) {
      return user
    }
    return null
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
