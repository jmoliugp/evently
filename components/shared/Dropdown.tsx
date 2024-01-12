import React, { useEffect, useState } from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/category.actions";
import { Category } from "@prisma/client";

interface Props {
  value?: string;
  onChangeHandler?: () => void;
}

export const Dropdown: React.FC<Props> = ({ onChangeHandler, value }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("");

  const addCategory = async () => {
    const newCategory = await createCategory({
      name: category.trim(),
    });
    if (!newCategory) return;

    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  useEffect(() => {
    const getCategories = async () => {
      const categories = await getAllCategories();

      if (categories) {
        setCategories(categories);
      }
    };
    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => {
            const categoryId = category.id;

            return (
              <SelectItem key={categoryId} value={categoryId}>
                {category.name}
              </SelectItem>
            );
          })}
        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription></AlertDialogDescription>
              <Input
                type="text"
                placeholder="Category name"
                className="input-field mt-3"
                onChange={(event) => setCategory(event.target.value)}
              />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={addCategory}
                disabled={category.trim().length === 0}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};
