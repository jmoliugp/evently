"use server";

import { prisma } from "@/lib/database";
import { handleError } from "@/lib/utils/handleError";
import { CreateEventParams, Event } from "@/types";
import { Event as DbEvent } from "@prisma/client";

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
        organizer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (eventWithDetails == null) throw new Error("Event not found");

    return eventWithDetails;
  } catch (error) {
    handleError(error);
    throw new Error("There was an error fetching the event");
  }
};
