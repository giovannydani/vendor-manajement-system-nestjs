import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { CreateUserRequest, UserResponse } from 'src/model/user.model';
import { UsersService } from 'src/users/users.service';
import { UsersValidation } from 'src/users/users.validation';
import { Logger } from 'winston';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private userService: UsersService,
    private validationService: ValidationService,
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
}
