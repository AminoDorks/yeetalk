import z from 'zod';

import { RoomSchema } from '../entities/room';
import { TagSchema } from '../entities/tag';
import { MessageSchema } from '../entities/message';
import { MemberSchema } from '../entities/member';

export const GetTagsResponseSchema = z.object({
  list: z.array(TagSchema),
});

export const GetRoomsResponseSchema = z.object({
  rooms: z.array(RoomSchema),
});

export const JoinRoomResponseSchema = z.object({
  pkId: z.string(),
  room: z.object({
    ...RoomSchema.shape,
    announcement: z.string(),
  }),
  token: z.string(),
  uid: z.number(),
});

export const GetMessagesResponseSchema = z.object({
  msgs: z.array(MessageSchema),
});

export const GetAudienceResponseSchema = z.object({
  audience: z.array(MemberSchema),
});

export type GetTagsResponse = z.infer<typeof GetTagsResponseSchema>;
export type GetRoomsResponse = z.infer<typeof GetRoomsResponseSchema>;
export type JoinRoomResponse = z.infer<typeof JoinRoomResponseSchema>;
export type GetMessagesResponse = z.infer<typeof GetMessagesResponseSchema>;
export type GetAudienceResponse = z.infer<typeof GetAudienceResponseSchema>;
