"use server";

import { prisma } from "@/lib/database";
import { handleError } from "@/lib/utils/handleError";
import { Prisma } from "@prisma/client";

export const createCategory = async (
  categoryInput: Prisma.CategoryCreateInput
) =>
  prisma.category
    .create({ data: categoryInput })
    .catch((error) => handleError(error));

export const getAllCategories = () =>
  prisma.category.findMany().catch((error) => handleError(error));
