import EventForm from "@/components/shared/EventForm";
import { getEventWithDetails } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const UpdateEvent: React.FC<Props> = async ({ params }) => {
  const { userId } = auth();

  const event = await getEventWithDetails(params.id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h3>
      </section>
      <div className="warpper my-8">
        <EventForm type="Update" userId={userId as string} event={event} />
      </div>
    </>
  );
};

export default UpdateEvent;
