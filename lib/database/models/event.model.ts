import {
  InferBaseSchemaType,
  InferDocSchemaType,
  ModelKey,
} from "@/lib/database/models/types";
import { Schema, model, models } from "mongoose";

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: ModelKey.Category },
  organizer: { type: Schema.Types.ObjectId, ref: ModelKey.User },
});

export type EventSchema = InferBaseSchemaType<typeof schema>;
export type EventDocument = InferDocSchemaType<EventSchema>;
export const Event = models.Event || model<EventSchema>(ModelKey.Event, schema);
