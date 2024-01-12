"use server";

import { prisma } from "@/lib/database";
import { handleError } from "@/lib/utils/handleError";
import { CreateEventParams } from "@/types";

export const createEvent = async ({
  event,
  path,
  userId,
}: CreateEventParams) => {
  let organizer;
  try {
    organizer = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
  } catch (error) {
    handleError(error);
  }

  if (!organizer) {
    throw new Error("Organizer not found");
  }

  try {
    const newEvent = await prisma.event.create({
      data: {
        ...event,
        categoryId: event.categoryId,
        organizerId: organizer.id,
      },
    });
    return newEvent;
  } catch (error) {
    handleError(error);
  }
};
