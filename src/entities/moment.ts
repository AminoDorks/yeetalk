import z from 'zod';

import { UserSchema } from './user';
import { ShortUserSchema } from './short-user';

export const MediaSchema = z.object({
  height: z.number(),
  width: z.number(),
  url: z.string(),
  mediaTime: z.number(),
  type: z.number(),
  id: z.number(),
});

export const MomentSchema = z.object({
  attachType: z.number(),
  auditLevel: z.number(),
  commentControl: z.number(),
  createTime: z.number(),
  id: z.number(),
  likeUsers: z.array(ShortUserSchema),
  medias: z.array(MediaSchema),
  text: z.string(),
  totalComment: z.number(),
  updateTime: z.number(),
  user: ShortUserSchema,
});

export type Moment = z.infer<typeof MomentSchema>;
export type Media = z.infer<typeof MediaSchema>;
