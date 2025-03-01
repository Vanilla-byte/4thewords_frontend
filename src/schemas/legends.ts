import { Schema } from "effect";

export const Category = Schema.Struct({
  name: Schema.String,
  id: Schema.String,
});
export type Category = Schema.Schema.Type<typeof Category>;

export const Province = Schema.Struct({
  name: Schema.String,
  id: Schema.String,
});
export type Province = Schema.Schema.Type<typeof Province>;

export const Canton = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  province_id: Schema.String,
});
export type Canton = Schema.Schema.Type<typeof Canton>;

export const District = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  canton_id: Schema.String,
});
export type District = Schema.Schema.Type<typeof District>;

export const Legend = Schema.Struct({
  id: Schema.NullOr(Schema.Number),
  name: Schema.String,
  category: Category,
  description: Schema.String,
  legend_date: Schema.String,
  location: Schema.Struct({
    province: Province,
    canton: Canton,
    district: District,
  }),
  image: Schema.String,
  source: Schema.String,
});

export type Legend = Schema.Schema.Type<typeof Legend>;
