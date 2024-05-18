import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { userData } from './user.interface';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  async createUser(username: string, email: string, passwordHash: string): Promise<User> {
    const newUser = this.userRepository.create({
      username,
      email,
      passwordHash,
    })
    const savedUser = await this.userRepository.save(newUser) // add error handling
    return savedUser
  }

  async getUser(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username: username })
  }
}
