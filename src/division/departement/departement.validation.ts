import { ZodType, z } from 'zod';

export class DepartementValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(3).max(100),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(3).max(100).optional(),
  });
}
