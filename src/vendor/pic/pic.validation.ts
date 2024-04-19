import { ZodType, z } from 'zod';

export class PicValidation {
  static readonly CREATE: ZodType = z.object({
    id: z.string().optional(),
    role_id: z.string().max(100),
    name: z.string().min(3).max(100),
    phone: z.string().min(10).max(20),
    email: z.string().min(3).max(100),
    default: z.boolean().optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    role_id: z.string().max(100).optional(),
    name: z.string().min(3).max(100).optional(),
    phone: z.string().min(10).max(20).optional(),
    email: z.string().min(3).max(100).optional(),
    default: z.boolean().optional(),
  });
}
