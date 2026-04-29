import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { S3Service } from 'src/common/providers/s3-service';

describe('AuthController', () => {
  let authService: AuthService;
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, S3Service],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const users = [
        {
          name: 'Furqan',
          age: 23,
          password: '93939'
        }
      ];

      expect(await authController.allUsers).toBe(users);

    })
  })

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });
});
