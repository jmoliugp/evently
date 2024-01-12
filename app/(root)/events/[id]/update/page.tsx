import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs";
import React from "react";

const UpdateEvent = () => {
  const { userId } = auth();

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h3>
      </section>
      <div className="warpper my-8">
        <EventForm type="Create" userId={userId as string} />
      </div>
    </>
  );
};

export default UpdateEvent;
