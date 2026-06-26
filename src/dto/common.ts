import z from 'zod';

import { CountrySchema, HobbySchema } from '../entities';

export const CommonResponseSchema = z.object({
  code: z.number(),
  data: z.union([z.string(), z.object()]).nullable(),
  message: z.string(),
});

export const UploadResponseSchema = z.object({
  id: z.number(),
  url: z.string(),
});

export const GetHobbiesResponseSchema = z.object({
  list: z.array(HobbySchema),
});

export const GetCountriesResponseSchema = z.object({
  list: z.array(
    z.object({
      key: z.string(),
      list: z.array(CountrySchema),
    })
  ),
});

export type CommonResponse = z.infer<typeof CommonResponseSchema>;
export type UploadResponse = z.infer<typeof UploadResponseSchema>;
export type GetHobbiesResponse = z.infer<typeof GetHobbiesResponseSchema>;
export type GetCountriesResponse = z.infer<typeof GetCountriesResponseSchema>;
