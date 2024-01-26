"use server";

import { prisma } from "@/lib/database";
import { handleError } from "@/lib/utils/handleError";
import {
  CheckoutOrderParams,
  CreateOrderParams,
  GetOrdersByEventParams,
} from "@/types";
import { redirect } from "next/navigation";
import Stripe from "stripe";

// Queries

export async function getOrdersByEvent({
  searchString,
  eventId,
}: GetOrdersByEventParams) {
  try {
    if (!eventId) throw new Error("Event ID is required");

    const orders = await prisma.order.findMany({
      where: {
        eventId,
        buyer: {
          OR: [
            {
              firstName: {
                contains: searchString,
                mode: "insensitive",
              },
              lastName: {
                contains: searchString,
                mode: "insensitive",
              },
            },
          ],
        },
      },
      include: {
        buyer: true,
        event: true,
      },
    });

    return orders;
  } catch (error) {
    handleError(error);
  }
}

// Mutations
