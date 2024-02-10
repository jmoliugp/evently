"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils/formUrlQuery";
import { removeKeysFromQuery } from "@/lib/utils/removeKeysFromQuery";
import { ParamKey } from "@/lib/constants";

interface Props {
  placeholder?: string;
}

const DEBOUNCE_TIME = 300;

export const Search: React.FC<Props> = ({
  placeholder = "Search title...",
}) => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = searchParams.toString();

      const newUrl = searchText
        ? formUrlQuery({ params, key: ParamKey.SearchText, value: searchText })
        : removeKeysFromQuery({ params, keysToRemove: [ParamKey.SearchText] });

      router.push(newUrl, { scroll: false });
    }, DEBOUNCE_TIME);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, searchParams, router]);

  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={24}
        height={24}
      />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setSearchText(e.target.value)}
        className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default Search;
