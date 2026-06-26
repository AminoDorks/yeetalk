import z from 'zod';

import { CountrySchema } from './country';
import { LanguageSchema } from './language';

export const SpeakerSchema = z.object({
  areaCode: z.string().optional(),
  auditedHeadUrl: z.string().optional(),
  auditedNickName: z.string().optional(),
  birthday: z.string(),
  celebMedals: z.array(z.any()),
  city: z.string(),
  cnm: z.boolean().optional(),
  distance: z.number(),
  fans: z.number(),
  follow: z.number(),
  gender: z.number(),
  headUrl: z.string(),
  hide: z.number(),
  identity: z.string(),
  imAccount: z.string(),
  inCountry: CountrySchema.optional(),
  introduce: z.string(),
  isOnline: z.boolean(),
  isVip: z.number(),
  lastTime: z.number(),
  learnLanguage: z.array(LanguageSchema),
  loverIdentity: z.string(),
  nickName: z.string(),
  registerTime: z.string(),
  skilledLanguage: z.array(LanguageSchema),
  status: z.number(),
  thirdAccountType: z.array(z.number()),
  vipExpire: z.number(),
});

export type Speaker = z.infer<typeof SpeakerSchema>;
