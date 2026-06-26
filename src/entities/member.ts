import z from 'zod';

export const MemberSchema = z.object({
  headUrl: z.string(),
  identity: z.string(),
  nationFlag: z.string(),
});

export type Member = z.infer<typeof MemberSchema>;
