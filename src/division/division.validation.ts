import { ZodType, z } from 'zod';

export class DivisionValidation {
  static readonly CREATE: ZodType = z.object({
    id: z.string().optional(),
    name: z.string().min(3).max(100),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(3).max(100).optional(),
  });
}
