import z from 'zod';

export const MessageSchema = z.object({
  content: z.string(),
  member: z.object({
    headUrl: z.string(),
    identity: z.string(),
    nickName: z.string(),
  }),
  seq: z.number(),
  time: z.number(),
});

export type Message = z.infer<typeof MessageSchema>;
