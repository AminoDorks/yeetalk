import z from 'zod';

import { CountrySchema } from './country';
import { LanguageSchema } from './language';
import { HobbySchema } from './hobby';

export const AccountSchema = z.object({
  areaCode: z.string(),
  auditedHeadUrl: z.string(),
  auditedNickName: z.string(),
  birthday: z.string(),
  celebMedals: z.array(z.any()),
  city: z.string(),
  cnm: z.boolean(),
  country: z.array(z.any()),
  cover: z.string(),
  distance: z.number(),
  email: z.string(),
  fans: z.number(),
  follow: z.number(),
  gender: z.number(),
  headUrl: z.string(),
  hide: z.number(),
  hobbes: z.array(HobbySchema),
  identity: z.string(),
  imAccount: z.string(),
  inCountry: CountrySchema,
  introduce: z.string(),
  isOnline: z.boolean(),
  isVip: z.number(),
  lastTime: z.number(),
  learnLanguage: z.array(LanguageSchema),
  loverIdentity: z.string(),
  moments: z.number(),
  nickName: z.string(),
  registerTime: z.string(),
  skilledLanguage: z.array(LanguageSchema),
  status: z.number(),
  thirdAccountType: z.array(z.number()),
  vipExpire: z.number(),
});

export type User = z.infer<typeof AccountSchema>;
