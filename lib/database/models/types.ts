import { Document, InferSchemaType, Types } from "mongoose";

export type InferDocSchemaType<T> = Document<unknown, any, T> &
  Omit<T & { _id: Types.ObjectId }, never>;

export type InferBaseSchemaType<T> = Omit<
  InferSchemaType<T>,
  "createdAt" | "updatedAt"
>;

export enum ModelKey {
  Category = "Category",
  Event = "Event",
  User = "User",
}
