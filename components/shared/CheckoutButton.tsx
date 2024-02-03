"use client";

import { Button } from "@/components/ui/button";
import { Event } from "@/types";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect } from "react";
import { Checkout } from "./Checkout";
import { loadStripe } from "@stripe/stripe-js";

interface Props {
  event: Event;
}

export const CheckoutButton: React.FC<Props> = ({ event }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventFinished = event.endDateTime < new Date();

  if (!userId) {
    return null;
  }

  if (hasEventFinished) {
    return (
      <div className="flex items-center gap-3">
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <SignedOut>
        <Button asChild className="button rounded-full" size="lg">
          <Link href="/sign-in">Get Tickets</Link>
        </Button>
      </SignedOut>

      <SignedIn>
        <Checkout event={event} userId={userId} />
      </SignedIn>
    </div>
  );
};
