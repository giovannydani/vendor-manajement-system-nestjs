import { z, ZodType } from 'zod';

export class AuthValidation {
  static readonly LOGIN: ZodType = z.object({
    username: z.string().max(100).min(4),
    password: z.string().max(100).min(8),
  });
}
