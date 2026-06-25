import { z } from 'zod';

export const LanguageSchema = z.object({
  defaultLanguage: z.number(),
  id: z.number(),
  mainName: z.string(),
  practised: z.number(),
  shortName: z.string(),
  subName: z.string(),
});

export type Language = z.infer<typeof LanguageSchema>;
