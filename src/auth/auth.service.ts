import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UsersService,
    private mailService: MailService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async register(data: AuthRegisterDto) {
    const user = await this.userService.create(data);
    return { accessToken: this.jwtService.sign({ userId: user.id }) };
  }

  async forget(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      throw new UnauthorizedException(`No user found for email: ${email}`);
    }
    const token = this.jwtService.sign({ userId: user.id });
    await this.mailService.sendMailForgotPassword(user, token);
    return true;
  }
}
