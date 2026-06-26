import z from 'zod';

import { ShortUserSchema } from './short-user';

export const CommentSchema = z.object({
  auditLevel: z.number(),
  correction: z.number(),
  correctionNext: z.string().optional(),
  createTime: z.number(),
  id: z.number(),
  momentId: z.number(),
  replyCommentId: z.number(),
  replyToUser: ShortUserSchema,
  rootCommentId: z.number(),
  status: z.number(),
  text: z.string(),
  totalReply: z.number(),
  type: z.number(),
  updateTime: z.number(),
  user: ShortUserSchema,
});

export type Comment = z.infer<typeof CommentSchema>;
