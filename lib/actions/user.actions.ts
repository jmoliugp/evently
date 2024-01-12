"use server";

import { prisma } from "@/lib/database";
import { handleError } from "@/lib/utils/handleError";
import { UpdateUserParams } from "@/types";

import { Prisma } from "@prisma/client";

export async function createUser(userInput: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.create({ data: userInput });
    return user;
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(clerkId: string) {
  try {
    const user = await prisma.user.findFirst({ where: { clerkId } });

    if (user == null) throw new Error("User not found");
    return user;
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    const updatedUser = await prisma.user.update({
      where: { clerkId },
      data: user,
    });

    if (!updatedUser) throw new Error("User update failed");
    return updateUser;
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  // try {
  //   await connectToDatabase();
  //   const userToDelete = await User.findOne({ clerkId });
  //   if (!userToDelete) {
  //     throw new Error("User not found");
  //   }
  //   // Unlink relationships
  //   await Promise.all([
  //     // Update the 'events' collection to remove references to the user
  //     Event.updateMany(
  //       { _id: { $in: userToDelete.events } },
  //       { $pull: { organizer: userToDelete._id } }
  //     ),
  //     // Update the 'orders' collection to remove references to the user
  //     Order.updateMany(
  //       { _id: { $in: userToDelete.orders } },
  //       { $unset: { buyer: 1 } }
  //     ),
  //   ]);
  //   const deletedUser = await User.findByIdAndDelete(userToDelete._id);
  //   revalidatePath("/");
  //   return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  // } catch (error) {
  //   handleError(error);
  // }
}
