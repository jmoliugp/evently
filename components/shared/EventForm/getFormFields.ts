import { eventDefaultValues } from "@/lib/constants";
import { CreateEventParams, Event } from "@/types";

interface Props {
  event?: Event;
  type: "Create" | "Update";
}

export const getFormFields = ({
  event,
  type,
}: Props): CreateEventParams["event"] => {
  if (type === "Update" && event) {
    return {
      ...event,
      categoryId: event.category?.id,
      description: event.description ?? undefined,
      location: event.location ?? undefined,
      price: event.price ?? undefined,
      url: event.url ?? undefined,
    };
  }

  return eventDefaultValues;
};
