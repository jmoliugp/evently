import CategoryFilter from "@/components/shared/CategoryFilter";
import { Collection } from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { Routes, assets } from "@/lib/constants";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface HomeSearchParams {
  page?: string;
  searchText?: string;
  category?: string;
}

const Home: React.FC<SearchParamProps<HomeSearchParams>> = async ({
  searchParams,
}) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = searchParams?.searchText || "";
  const category = searchParams?.category || "";

  const { data, totalPages } = await getAllEvents({
    searchText,
    category,
    page,
  });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Host, Connect, Celebrate: Your Events, Our Platform!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Book and learn helpful tips from multiple mentors in world-class
              companies with our global community
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href={Routes.Events}>Explore now</Link>
            </Button>
          </div>

          <Image
            src={assets.hero}
            alt="hero"
            height={1000}
            width={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          ></Image>
        </div>
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          {" "}
          Trust by <br /> Thousand of events
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>
        <Collection
          data={data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          type="AllEvents"
          limit={6}
          page={page}
          totalPages={totalPages}
        />
      </section>
    </>
  );
};

export default Home;
