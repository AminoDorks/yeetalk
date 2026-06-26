import z from 'zod';

import { MomentSchema } from '../entities/moment';
import { CommentSchema } from '../entities/comment';

export const GetMomentsResponseSchema = z.object({
  isLast: z.number(),
  moments: z.array(MomentSchema),
});

export const GetCommentsResponseSchema = z.object({
  comments: z
    .array(
      z.object({
        rootComment: CommentSchema,
      })
    )
    .optional(),
});

export type GetMomentsResponse = z.infer<typeof GetMomentsResponseSchema>;
export type GetCommentsResponse = z.infer<typeof GetCommentsResponseSchema>;
