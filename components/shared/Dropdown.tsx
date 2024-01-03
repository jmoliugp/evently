import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryDocument } from "@/lib/database/models/category.model";

interface Props {
  value?: string;
  onChangeHandler?: () => void;
}

export const Dropdown: React.FC<Props> = ({ onChangeHandler, value }) => {
  const [categories, setCategories] = useState<CategoryDocument[]>([
    { _id: 1, name: "Category 1" },
    { _id: 2, name: "Category 2" },
  ]);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {/* <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem> */}
        {categories.length > 0 &&
          categories.map((category) => {
            const categoryId = category._id.toString();

            return (
              <SelectItem key={categoryId} value={categoryId}>
                {category.name}
              </SelectItem>
            );
          })}
      </SelectContent>
    </Select>
  );
};
