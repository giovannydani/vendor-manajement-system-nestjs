import { z, ZodType } from 'zod';

export class AccountValidation {
  static readonly CREATE: ZodType = z.object({
    bank_id: z.string().max(100),
    number: z.string().min(3).max(100),
    name: z.string().min(3).max(100),
    bank_branch: z.string().min(3).max(100),
    status: z.boolean().optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    bank_id: z.string().max(100).optional(),
    number: z.string().min(3).max(100).optional(),
    name: z.string().min(3).max(100).optional(),
    bank_branch: z.string().min(3).max(100).optional(),
    status: z.boolean().optional(),
  });
}
