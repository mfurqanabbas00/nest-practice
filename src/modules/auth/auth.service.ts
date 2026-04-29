import { BadRequestException, Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../common/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async signUp(data: CreateUserDto) {

    const isExisted = await this.userRepository.findOne({
      where: {
        name: data.name
      }
    });

    if(isExisted) {
      throw new BadRequestException("User already exists");
    }

    const saltsOrRounds = 10;

    const hashPassword = await bcrypt.hash(data.password, saltsOrRounds);

    const { password, ...rest } = data;

    const user = { ...rest, password: hashPassword };

    await this.userRepository.save(user);

    const event = this.eventEmitter.emit(
      'auth.register',
      { userName: user.name, age: user.age }
    )
    console.log("Emitted Event:", event);

    return 'User created successfully';
  }

  async signIn(data: LoginUserDto) {

    const user = await this.userRepository.findOne({
      where: {
        name: data.name
      }
    });

    if(!user) {
      throw new UnauthorizedException("User not found");
    }

    // always first user plain password and then encrypted password;

    const password = await bcrypt.compare(data.password, user.password);

    if(!password) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const tokens = await this.generateTokens(user.id, user.name);

    return {
      status: 200,
      data: {
        user,
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
      }
    }

  }

  async allUsers() {
    return this.userRepository.find();
  }

  async generateTokens (userId: number, name: string) {
    const payload = { sub: userId, name };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '7d',
      })
    ]);

    return { accessToken, refreshToken };

  }


}
