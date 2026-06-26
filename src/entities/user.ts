import z from 'zod';

import { HobbySchema } from './hobby';
import { SpeakerSchema } from './speaker';

export const UserSchema = z.object({
  ...SpeakerSchema.shape,
  country: z.array(z.any()),
  cover: z.string(),
  email: z.string(),
  hobbes: z.array(HobbySchema),
  moments: z.number(),
});

export type User = z.infer<typeof UserSchema>;
