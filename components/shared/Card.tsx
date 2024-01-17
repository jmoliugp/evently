import React from "react";
import { Event } from "@prisma/client";
import Link from "next/link";

interface Props {
  event: Event;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
}

export const Card: React.FC<Props> = ({ event, hasOrderLink, hidePrice }) => {
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/events/${event.id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500"
      />
      {/* TODO: Event creator actions */}
      <Link
        href={`/events/${event.id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      />
    </div>
  );
};
