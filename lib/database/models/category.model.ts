import {
  InferBaseSchemaType,
  InferDocSchemaType,
  ModelKey,
} from "@/lib/database/models/types";
import { Schema, model, models } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true, unique: true },
});

export type CategorySchema = InferBaseSchemaType<typeof schema>;
export type CategoryDocument = InferDocSchemaType<CategorySchema>;
export const Category =
  models.Category || model<CategorySchema>(ModelKey.Category, schema);
