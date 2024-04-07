import { z, ZodType } from 'zod';

export class UsersValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().max(100).min(4),
    username: z.string().max(100).min(4),
    email: z.string().max(100).min(4).email(),
    password: z.string().max(100).min(8),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().max(100).min(4).optional(),
    username: z.string().max(100).min(4).optional(),
    email: z.string().max(100).min(4).email().optional(),
    password: z.string().max(100).min(8).optional(),
  });
}
