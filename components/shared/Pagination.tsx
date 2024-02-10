"use client";

import { Button } from "@/components/ui/button";
import { ParamKey } from "@/lib/constants";
import { formUrlQuery } from "@/lib/utils/formUrlQuery";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

interface Props {
  page: number;
  totalPages: number;
  urlParamName?: string;
}

enum ButtonAction {
  Next = "next",
  Previous = "previous",
}

export const Pagination: React.FC<Props> = ({
  page,
  totalPages,
  urlParamName,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = searchParams.toString();

  const onClick = (action: ButtonAction) => {
    const newPage = action === ButtonAction.Next ? page + 1 : page - 1;

    const newUrl = formUrlQuery({
      key: ParamKey.Page,
      params,
      value: newPage.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex gap-2">
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        onClick={() => onClick(ButtonAction.Previous)}
        disabled={page <= 1}
      >
        Previous
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        onClick={() => onClick(ButtonAction.Next)}
        disabled={page >= totalPages}
      >
        Next
      </Button>
    </div>
  );
};
