"use server";

import { prisma } from "@/lib/database";
import { handleError } from "@/lib/utils/handleError";
import {
  CheckoutOrderParams,
  CreateOrderParams,
  GetOrdersByEventParams,
  GetOrdersByUserParams,
  Order,
  WithPagination,
} from "@/types";

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

export async function getOrdersByUser({
  clerkId,
  limit = 3,
  page = 1,
}: GetOrdersByUserParams): Promise<WithPagination<Order>> {
  try {
    const skipAmount = (Number(page) - 1) * limit;
    const condition = {
      buyer: {
        clerkId,
      },
    };

    const rawOrders = await prisma.order.findMany({
      where: condition,
      skip: skipAmount,
      take: limit,
      include: {
        buyer: true,
        event: {
          include: {
            organizer: true,
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const count = await prisma.order.count({ where: condition });

    const orders = rawOrders.map<Order>((order) => ({
      buyer: order.buyer!,
      buyerId: order.buyerId,
      createdAt: order.createdAt,
      event: {
        endDateTime: order.event.endDateTime,
        id: order.event.id,
        imageUrl: order.event.imageUrl,
        isFree: order.event.isFree,
        price: order.event.price,
        startDateTime: order.event.startDateTime,
        title: order.event.title,
        category:
          order.event.category !== null
            ? {
                id: order.event.category.id,
                name: order.event.category.name,
              }
            : undefined,
      },
      eventId: order.event?.id ?? undefined,
      id: order.id,
      stripeId: order.stripeId,
      totalAmount: order.totalAmount,
    }));

    return {
      data: orders,
      totalPages: Math.ceil(count / limit),
    };
  } catch (error) {
    return handleError(error);
  }
}

// Mutations

export const createOrder = async (orderParams: CreateOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const order = await prisma.order.create({
      data: {
        stripeId: orderParams.stripeId,
        buyerId: orderParams.buyerId,
        eventId: orderParams.eventId,
        totalAmount: orderParams.totalAmount,
      },
    });

    return order;
  } catch (error) {
    handleError(error);
  }
};

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = order.isFree ? 0 : Number(order.price) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: order.eventTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    return session.url;
  } catch (error) {
    handleError(error);
  }
};
