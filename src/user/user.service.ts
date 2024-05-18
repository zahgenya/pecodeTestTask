import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async createUser(
    username: string,
    email: string,
    passwordHash: string
  ): Promise<User> {
    const newUser = this.userRepository.create({
      username,
      email,
      passwordHash,
    });
    const savedUser = await this.userRepository.save(newUser); // add error handling
    return savedUser;
  }

  async getUser(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }
}
