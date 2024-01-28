"use server";

import { prisma } from "@/lib/database";
import { handleError } from "@/lib/utils/handleError";
import {
  CheckoutOrderParams,
  CreateOrderParams,
  GetOrdersByEventParams,
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
