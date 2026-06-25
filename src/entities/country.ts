import { z } from 'zod';

export const CountrySchema = z.object({
  name: z.string(),
  icon: z.string(),
  id: z.number(),
  timeZone: z.number(),
});

export type Country = z.infer<typeof CountrySchema>;
