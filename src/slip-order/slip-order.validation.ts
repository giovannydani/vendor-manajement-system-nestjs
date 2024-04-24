import { ZodType, z } from 'zod';

export class SlipOrderValidation {
  static readonly CREATE: ZodType = z.object({
    departement_id: z.string(),
    requester: z.string().max(100),
    recived_date: z.string(),
    request_type: z.string().max(100),
    status: z.string().max(100),
    file: z.string().max(255).optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    departement_id: z.string().optional(),
    requester: z.string().max(100).optional(),
    recived_date: z.string().optional(),
    request_type: z.string().max(100).optional(),
    status: z.string().max(100).optional(),
    file: z.string().max(255).optional(),
  });
}
