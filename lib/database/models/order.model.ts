import {
  InferBaseSchemaType,
  InferDocSchemaType,
  ModelKey,
} from "@/lib/database/models/types";
import { Schema, model, models } from "mongoose";

export type OrderItem = {
  _id: string;
  totalAmount: string;
  createdAt: Date;
  eventTitle: string;
  eventId: string;
  buyer: string;
};

const schema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  totalAmount: {
    type: String,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: ModelKey.Event,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: ModelKey.User,
  },
});

export type OrderSchema = InferBaseSchemaType<typeof schema>;
export type OrderDocument = InferDocSchemaType<OrderSchema>;
export const Order = models.Order || model<OrderSchema>(ModelKey.Order, schema);
