import z from 'zod';

export const GiftWallSchema = z.object({
  awakenNum: z.number(),
  collectScore: z.number(),
  giftWallLv: z.number(),
  giftWallNum: z.number(),
  icon: z.string(),
  ranking: z.string(),
  seriesNum: z.number(),
  title: z.string(),
  userGiftWallNum: z.number(),
  userSeriesNum: z.number(),
  userSeriesCollections: z.array(z.object({ collected: z.boolean(), url: z.string() })),
});

export type GiftWall = z.infer<typeof GiftWallSchema>;
