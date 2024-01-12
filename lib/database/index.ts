import { PrismaClient } from "@prisma/client";
import mongoose from "mongoose";

// Legacy
////////////////////////////////////////////////////////////////////////////////////
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_NAME = process.env.MONGODB_NAME;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_NAME,
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
////////////////////////////////////////////////////////////////////////////////////

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
