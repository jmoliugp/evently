import {
  InferBaseSchemaType,
  InferDocSchemaType,
  ModelKey,
} from "@/lib/database/models/types";
import { Schema, model, models } from "mongoose";

const schema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
});

export type UserSchema = InferBaseSchemaType<typeof schema>;
export type UserDocument = InferDocSchemaType<UserSchema>;
export const User = models.User || model<UserSchema>(ModelKey.User, schema);
