import { z } from "zod";

export const Category = z.object({
  name: z.string(),
  id: z.number().nullable(),
});
export type Category = z.infer<typeof Category>;

export const Province = z.object({
  name: z.string(),
  id: z.number().nullable(),
});
export type Province = z.infer<typeof Province>;

export const Canton = z.object({
  id: z.number().nullable(),
  name: z.string(),
  province_id: z.number().nullable(),
});
export type Canton = z.infer<typeof Canton>;

export const District = z.object({
  id: z.number().nullable(),
  name: z.string(),
  canton_id: z.number().nullable(),
});

export type District = z.infer<typeof District>;

export const Legend = z.object({
  id: z.number().nullable(),
  name: z.string(),
  category: Category,
  description: z.string(),
  legend_date: z.string(),
  created_at: z.string(),
  relative_created_at: z.string(),
  province: Province,
  canton: Canton,
  district: District,
  image_url: z.string(),
  source: z.string(),
});
export type Legend = z.infer<typeof Legend>;

export const LegendDto = z.object({
  id: z.number().nullable(),
  name: z.string(),
  category: Category,
  description: z.string(),
  legend_date: z.string(),
  province: Province,
  canton: Canton,
  district: District,
  image_url: z.string(),
  source: z.string(),
});

export type LegendDto = z.infer<typeof LegendDto>;
