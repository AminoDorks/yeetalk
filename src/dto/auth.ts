import z from 'zod';
import { BalanceSchema } from '../entities/balance';
import { GiftWallSchema } from '../entities/gift-wall';
import { AccountSchema } from '../entities/user';

export const GetMeResponseSchema = z.object({
  balance: BalanceSchema,
  dressRedDot: z.boolean(),
  giftWallInfo: GiftWallSchema,
  nobleInfo: z.object({
    ranking: z.number(),
  }),
  showTab: z.number(),
  userInfo: z.object({
    isBlack: z.boolean(),
    user: AccountSchema,
    visitNewUserCount: z.number(),
    visitNewUserHeadUrl: z.array(z.string()),
    visitUserCount: z.number(),
  }),
});

export type GetMeResponse = z.infer<typeof GetMeResponseSchema>;
