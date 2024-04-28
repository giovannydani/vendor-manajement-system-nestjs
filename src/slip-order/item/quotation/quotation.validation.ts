import { ZodType, z } from 'zod';

export class QuotationValidation {
  static readonly CREATE: ZodType = z.object({
    vendor_id: z.string(),
    unit_id: z.string(),
    number: z.string().max(100),
    recived_date: z.string(),
    request_date: z.string(),
    price: z.string(),
    status: z.string(),
    quotation: z.string().optional(),
    quantity: z.string(),
    notes: z.string(),
  });

  static readonly UPDATE: ZodType = z.object({
    vendor_id: z.string().optional(),
    unit_id: z.string().optional(),
    number: z.string().max(100).optional(),
    recived_date: z.string().optional(),
    request_date: z.string().optional(),
    price: z.string().optional(),
    status: z.string().optional(),
    quotation: z.string().optional(),
    quantity: z.string().optional(),
    notes: z.string().optional(),
  });
}
