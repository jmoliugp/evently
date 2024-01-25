import { Collection } from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ProfilePage: React.FC = () => {
  // TODO: Dummy data
  const orderedEvents = [] as any;
  const orderPage = 1;
  const orders = { totalPages: 1 };

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">Explore More Events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={orderedEvents}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          type="MyTickets"
          limit={3}
          page={orderPage}
          urlParamName="ordersPage"
          totalPages={orders.totalPages}
        ></Collection>
      </section>

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">Create New Event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={orderedEvents}
          emptyTitle="No event have been created yet"
          emptyStateSubtext="Go create some now"
          type="EventsOrganized"
          limit={6}
          page={orderPage}
          urlParamName="eventsPage"
          totalPages={orders.totalPages}
        ></Collection>
      </section>
    </>
  );
};

export default ProfilePage;
