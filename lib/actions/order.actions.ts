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

// FIXME: Failing on redirect
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
  console.log("🚀 ~ checkoutOrder 1");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  console.log("🚀 ~ checkoutOrder 2");

  const price = order.isFree ? 0 : Number(order.price) * 100;

  console.log("🚀 ~ checkoutOrder 3");
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
    console.log(
      "🚀 ~ checkoutOrder `${process.env.NEXT_PUBLIC_SERVER_URL}/`: ",
      `${process.env.NEXT_PUBLIC_SERVER_URL}/`
    );
    console.log("🚀 ~ checkoutOrder session.url: ", session.url);
    console.log("🚀 ~ checkoutOrder session.url: ", session.url);

    redirect(session.url!);
  } catch (error) {
    console.log("🚀 ~ checkoutOrder error: ", JSON.stringify(error));
  }
};
