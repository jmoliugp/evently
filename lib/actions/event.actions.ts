"use server";

import { prisma } from "@/lib/database";
import { handleError } from "@/lib/utils/handleError";
import {
  CreateEventParams,
  DeleteEventParams,
  Event,
  GetAllEventsParams,
  GetRelatedEventsByCategoryParams,
  UpdateEventParams,
} from "@/types";
import { Event as DbEvent } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createEvent = async ({
  event,
  path,
  userId,
}: CreateEventParams): Promise<Event> => {
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
      include: {
        category: true,
        organizer: true,
      },
    });

    return {
      ...newEvent,
    };
  } catch (error) {
    return handleError(error);
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

export async function getRelatedEvents({
  event,
  limit = 3,
  page = 1,
}: GetRelatedEventsByCategoryParams): Promise<{
  data: Event[];
  totalPages: number;
}> {
  try {
    const skipAmount = (Number(page) - 1) * limit;
    const condition = {
      AND: [
        {
          OR: [
            { categoryId: event.category?.id },
            { organizerId: event.organizer?.id },
            { location: event.location },
          ],
        },
        {
          NOT: {
            id: event.id,
          },
        },
      ],
    };

    const [events, count] = await prisma.$transaction([
      prisma.event.findMany({
        where: condition,
        include: {
          category: true,
          organizer: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: skipAmount,
        take: limit,
      }),
      prisma.event.count({ where: condition }),
    ]);

    return {
      data: events,
      totalPages: Math.ceil(count / limit),
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteEvent({ eventId, path }: DeleteEventParams) {
  try {
    await prisma.event.delete({ where: { id: eventId } });
    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

export async function updateEvent({
  userId,
  event,
  path,
}: UpdateEventParams): Promise<Event> {
  try {
    const eventToUpdate = await prisma.event.findFirst({
      where: { id: event.id },
      include: {
        organizer: true,
      },
    });

    if (!eventToUpdate || eventToUpdate.organizer?.clerkId !== userId) {
      throw new Error("Unauthorized or event not found");
    }

    const updatedEvent = await prisma.event.update({
      where: { id: event.id },
      data: {
        categoryId: event.categoryId,
        description: event.description,
        imageUrl: event.imageUrl,
        isFree: event.isFree,
        location: event.location,
        price: event.price,
        endDateTime: event.endDateTime,
        startDateTime: event.startDateTime,
        title: event.title,
        url: event.title,
      },
      include: {
        category: true,
        organizer: true,
      },
    });
    revalidatePath(path);

    return updatedEvent;
  } catch (error) {
    return handleError(error);
  }
}
