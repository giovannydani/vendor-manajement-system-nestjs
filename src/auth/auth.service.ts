import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  CreateUserRequest,
  //   toUserResponse,
  UserResponse,
} from 'src/model/user.model';
import { UsersService } from 'src/users/users.service';
import { UsersValidation } from 'src/users/users.validation';
import { Logger } from 'winston';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private userService: UsersService,
    private validationService: ValidationService,
    private jwtService: JwtService,
  ) {}

  async Register(request: CreateUserRequest): Promise<UserResponse> {
    const requestUser: CreateUserRequest = this.validationService.validate(
      UsersValidation.CREATE,
      request,
    );

    await this.userService.checkEmail(requestUser.email);
    await this.userService.checkUsername(requestUser.username);

    requestUser.id = uuid();
    requestUser.password = await bcrypt.hash(requestUser.password, 10);

    const user = await this.userService.create(requestUser);

    return user;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);

    if (await bcrypt.compare(pass, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  //   async Login(request: LoginUserRequest): Promise<UserResponse> {
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserDetail(user: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = await this.userService.getUserByUsername(
      user.username,
    );
    return result;
  }
}
