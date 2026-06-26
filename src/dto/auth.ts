import z from 'zod';

import { BalanceSchema } from '../entities/balance';
import { GiftWallSchema } from '../entities/gift-wall';
import { UserSchema } from '../entities/user';

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
    user: UserSchema,
    visitNewUserCount: z.number(),
    visitNewUserHeadUrl: z.array(z.string()),
    visitUserCount: z.number(),
  }),
});

export const RegisterResponseSchema = z.object({
  accessToken: z.string(),
  user: z.object({
    areaCode: z.string(),
    identity: z.string(),
    imAccount: z.string(),
    isRegistered: z.boolean(),
  }),
});

export type GetMeResponse = z.infer<typeof GetMeResponseSchema>;
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
