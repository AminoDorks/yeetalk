import z from 'zod';

export const HobbySchema = z.object({
  id: z.number(),
  name: z.string(),
  c: z.boolean(),
});

export type Hobby = z.infer<typeof HobbySchema>;
