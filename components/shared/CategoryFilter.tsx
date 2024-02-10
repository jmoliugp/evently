"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ParamKey } from "@/lib/constants";
import { formUrlQuery } from "@/lib/utils/formUrlQuery";
import { removeKeysFromQuery } from "@/lib/utils/removeKeysFromQuery";
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ALL_CATEGORIES_OPTION = "All";

const CategoryFilter: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const allCategories = await getAllCategories();

      allCategories && setCategories(allCategories);
    };

    getCategories();
  }, []);

  const onSelectCategory = (category: string) => {
    const params = searchParams.toString();

    const newUrl =
      category && category !== ALL_CATEGORIES_OPTION
        ? formUrlQuery({ params, key: ParamKey.Category, value: category })
        : removeKeysFromQuery({ params, keysToRemove: [ParamKey.Category] });

    router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={onSelectCategory}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          value={ALL_CATEGORIES_OPTION}
          className="select-item p-regular-14"
        >
          {ALL_CATEGORIES_OPTION}
        </SelectItem>
        {categories.map((category) => {
          return (
            <SelectItem
              value={category.name}
              key={category.id}
              className="select-item p-regular-14"
            >
              {category.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
