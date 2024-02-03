"use server";

import { prisma } from "@/lib/database";
import { handleError } from "@/lib/utils/handleError";
import { UpdateUserParams } from "@/types";

import { Prisma } from "@prisma/client";

// Queries

export async function getUserById(clerkId: string) {
  try {
    const user = await prisma.user.findFirst({ where: { clerkId } });

    if (user == null) throw new Error("User not found");
    return user;
  } catch (error) {
    handleError(error);
  }
}

// Mutations

export async function createUser(userInput: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.create({ data: userInput });
    return user;
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await prisma.user.update({
      where: { clerkId },
      data: user,
    });

    return updateUser;
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await prisma.user.delete({
      where: { clerkId },
    });

    return updateUser;
  } catch (error) {
    handleError(error);
  }
}
