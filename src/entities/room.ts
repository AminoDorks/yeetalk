import z from 'zod';

export const RoomSchema = z.object({
  advancedCard: z.boolean().optional(),
  avatarList: z.array(z.string()).optional(),
  countryList: z.array(z.string()).optional(),
  interestTag: z.string().optional(),
  interestTagId: z.number(),
  level: z.number(),
  memberNum: z.number(),
  ownerIdentity: z.string(),
  permission: z.number(),
  ranking: z.number().optional(),
  roomDesc: z.string(),
  roomId: z.string(),
  roomTopic: z.string(),
});

export type Room = z.infer<typeof RoomSchema>;
