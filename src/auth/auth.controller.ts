import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthForgotDto } from './dto/auth-forgot.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() { email, password }: AuthLoginDto) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() data: AuthRegisterDto) {
    return this.authService.register(data);
  }

  @Post('forgot')
  async forgot(@Body() { email }: AuthForgotDto) {
    return this.authService.forget(email);
  }
}
