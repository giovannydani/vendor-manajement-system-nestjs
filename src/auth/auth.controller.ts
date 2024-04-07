import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserRequest } from 'src/model/user.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async Register(@Body() request: CreateUserRequest) {
    const response = await this.authService.Register(request);

    return {
      data: response,
    };
  }
}
