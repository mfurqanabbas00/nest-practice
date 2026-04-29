import { 
  BadRequestException,
  Body, 
  Controller, 
  FileTypeValidator, 
  Get, 
  MaxFileSizeValidator, 
  ParseFilePipe, 
  Post, 
  Request, 
  UploadedFile, 
  UseInterceptors 
} from '@nestjs/common';

import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Role } from '../../common/enums/roles.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/common/providers/s3-service';
import { Roles } from 'src/common/decorators/roles.decorators';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly s3Service: S3Service,
  ) {}

  @ApiBody({ type: [CreateUserDto] })
  @Post('signup')
  signUp(@Body() data: CreateUserDto) {
    return this.authService.signUp(data);
  }

  @Roles(Role.Admin)
  @Post('signin')
  signIn(@Body() data: LoginUserDto) {
    return this.authService.signIn(data);
  }
  
  @Roles(Role.Admin)
  @Get('users')
  allUsers(){
    return this.authService.allUsers();
  }

  @Post('documents')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocuments(@UploadedFile(
    new ParseFilePipe({
      validators: [
        // new MaxFileSizeValidator({ maxSize: 110000 }), // 1000 bytes
        // new FileTypeValidator({ fileType: "image/jpeg" })
      ]
    })
  ) file: Express.Multer.File, @Request() req: Request){
    await this.s3Service.upload(file.originalname, file.buffer);
    console.log("File", file);
  }
}
