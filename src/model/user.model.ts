import { User } from '@prisma/client';

export type UserResponse = {
  id: string;
  name: string;
  username: string;
  email: string;
};

export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
  };
}

export type CreateUserRequest = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
};

export type LoginUserRequest = {
  username: string;
  password: string;
};
