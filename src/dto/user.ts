import z from 'zod';

import { MomentSchema, UserSchema } from '../entities';
import { SpeakerSchema } from '../entities/speaker';

export const GetUserResponseSchema = z.object({
  isBlack: z.boolean(),
  user: UserSchema,
  visitNewUserCount: z.number(),
  visitNewUserHeadUrl: z.array(z.string()),
  visitUserCount: z.number(),
});

export const SearchSpeakersResponseSchema = z.object({
  isLast: z.number(),
  users: z.array(SpeakerSchema),
});

export const GetUserMomentsResponseSchema = z.object({
  isLast: z.number(),
  momentList: z.array(MomentSchema),
});

export type GetUserResponse = z.infer<typeof GetUserResponseSchema>;
export type SearchSpeakersResponse = z.infer<typeof SearchSpeakersResponseSchema>;
export type GetUserMomentsResponse = z.infer<typeof GetUserMomentsResponseSchema>;
