import z from 'zod';

export const CommonResponseSchema = z.object({
  code: z.number(),
  data: z.object({}).nullable(),
  message: z.string(),
});

export type CommonResponse = z.infer<typeof CommonResponseSchema>;
