import { ZodType, z } from 'zod';

export class ItemValidation {
  static readonly CREATE: ZodType = z.object({
    category_id: z.string(),
    unit_id: z.string(),
    quantity: z.number(),
    name: z.string().max(100),
    detail: z.string(),
  });

  static readonly UPDATE: ZodType = z.object({
    category_id: z.string().optional(),
    unit_id: z.string().optional(),
    quantity: z.number().optional(),
    name: z.string().max(100).optional(),
    detail: z.string().optional(),
  });
}
