import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../common/entities/user.entity';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { S3Service } from 'src/common/providers/s3-service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 3,
        }
      ]
    }),
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
  AuthService,
  S3Service,
  {
     provide: APP_GUARD,
     useClass: ThrottlerModule,
  }],
  exports: [AuthService]
})
export class AuthModule {}
