import z from 'zod';

export const ShortUserSchema = z.object({
  headUrl: z.string().optional(),
  identity: z.string(),
  nickName: z.string().optional(),
});

export type ShortUser = z.infer<typeof ShortUserSchema>;
