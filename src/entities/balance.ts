import z from 'zod';

export const BalanceSchema = z.object({
  yeebean: z.number(),
  yeecoin: z.number(),
});

export type Balance = z.infer<typeof BalanceSchema>;
