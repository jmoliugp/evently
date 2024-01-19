import React from "react";
import { Event } from "@/types";
import { Card } from "@/components/shared/Card";
import { Pagination } from "@/components/shared/Pagination";

type CollectionType = "EventsOrganized" | "MyTickets" | "AllEvents";

interface Props {
  data: Event[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number;
  totalPages?: number;
  urlParamName?: string;
  type?: CollectionType;
}

export const Collection: React.FC<Props> = ({
  data,
  emptyStateSubtext,
  emptyTitle,
  limit,
  page,
  totalPages = 0,
  type,
  urlParamName,
}) => {
  if (data.length <= 1)
    return (
      <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
        <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
        <p className="p-regular-14">{emptyStateSubtext}</p>
      </div>
    );

  const hasOrderLink = type === "EventsOrganized";
  const hidePrice = type === "MyTickets";

  return (
    <div className="flex flex-col items-center gap-10">
      <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
        {data.map((event) => {
          return (
            <li key={event.id} className="flex justify-center">
              <Card
                event={event}
                hasOrderLink={hasOrderLink}
                hidePrice={hidePrice}
              />
            </li>
          );
        })}
      </ul>

      {totalPages > 1 && (
        <Pagination
          urlParamName={urlParamName}
          page={page}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};
