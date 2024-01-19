"use server";

import { prisma } from "@/lib/database";
import { handleError } from "@/lib/utils/handleError";
import {
  CreateEventParams,
  DeleteEventParams,
  Event,
  GetAllEventsParams,
} from "@/types";
import { Event as DbEvent } from "@prisma/client";
import { revalidatePath } from "next/cache";

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

export async function getAllEvents({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) {
  let events;
  try {
    events = await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
      skip: 0,
      take: limit,
      include: {
        category: true,
        organizer: true,
        Order: true,
        _count: true,
      },
    });
  } catch (error) {
    handleError(error);
  }

  if (!events) throw new Error("Events not found");

  const totalPages = Math.ceil(events.length / limit);

  return {
    events,
    totalPages,
  };
}

export const getEvent = async (id: string): Promise<DbEvent> => {
  let event;
  try {
    event = await prisma.event.findFirst({ where: { id } });
  } catch (error) {
    handleError(error);
  }

  if (!event) throw new Error("Event not found");

  return event;
};

export const getEventWithDetails = async (eventId: string): Promise<Event> => {
  try {
    const eventWithDetails = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        organizer: true,
        category: true,
      },
    });

    if (eventWithDetails == null) throw new Error("Event not found");

    return eventWithDetails;
  } catch (error) {
    handleError(error);
    throw new Error("There was an error fetching the event");
  }
};

export async function deleteEvent({ eventId, path }: DeleteEventParams) {
  try {
    await prisma.event.delete({ where: { id: eventId } });
    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}
