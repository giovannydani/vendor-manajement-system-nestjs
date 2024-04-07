import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import {
  CreateUserRequest,
  toUserResponse,
  UserResponse,
} from 'src/model/user.model';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  async create(req: CreateUserRequest): Promise<UserResponse> {
    const user = await this.prisma.user.create({
      data: req,
    });

    return toUserResponse(user);
  }

  async checkEmail(email: string): Promise<boolean> {
    const user = await this.prisma.user.count({
      where: {
        email: email,
      },
    });

    if (user > 0) {
      throw new HttpException('Email already exists', 400);
    }

    return true;
  }

  async checkUsername(username: string): Promise<boolean> {
    const user = await this.prisma.user.count({
      where: {
        username: username,
      },
    });

    if (user > 0) {
      throw new HttpException('Username already exists', 400);
    }

    return true;
  }
}
