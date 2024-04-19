import { ZodType, z } from 'zod';

export class VendorValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(3).max(100),
    phone: z.string().min(11).max(20),
    notes: z.string().optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(3).max(100).optional(),
    phone: z.string().min(11).max(20).optional(),
    notes: z.string().optional(),
  });
}
