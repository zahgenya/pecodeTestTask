import { Test, TestingModule } from '@nestjs/testing';
import { UserPostController } from './userPost.controller';

describe('UserPostController', () => {
  let controller: UserPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPostController],
    }).compile();

    controller = module.get<UserPostController>(UserPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
