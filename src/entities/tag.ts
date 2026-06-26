import z from 'zod';

export const TagSchema = z.object({
  id: z.number(),
  newUserSort: z.number(),
  tag: z.string(),
});

export type Tag = z.infer<typeof TagSchema>;
