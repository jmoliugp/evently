import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryDocument } from "@/lib/database/models/category.model";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

interface Props {
  value?: string;
  onChangeHandler?: () => void;
}

export const Dropdown: React.FC<Props> = ({ onChangeHandler, value }) => {
  const [categories, setCategories] = useState<CategoryDocument[]>([]);
  const [category, setCategory] = useState("");

  // TODO: Implement.
  const addCategory = () => {
    console.log("🚀 ~ addCategory onAction");
  };

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => {
            const categoryId = category._id.toString();

            return (
              <SelectItem key={categoryId} value={categoryId}>
                {category.name}
              </SelectItem>
            );
          })}
        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Open
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription></AlertDialogDescription>
              <Input
                type="text"
                placeholder="Category name"
                className="input-field mt-3"
              />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={addCategory}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};
