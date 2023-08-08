"use server";
import { revalidatePath } from "next/cache";
import prisma from "../prismaDB";

export async function updateUser({
  userId,
  username,
  name,
  bio,
  imageUrl,
  path,
}: {
  userId: string;
  username: string;
  name: string;
  bio: string;
  imageUrl: string;
  path: string;
}): Promise<void> {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          username: username.toLowerCase(),
          name,
          bio,
          imageUrl,
          userId,
          onboarded: true,
        },
      });
      console.log("user created successfully!");
    } else {
      await prisma.user.update({
        where: {
          userId: userId,
        },
        data: {
          username: username.toLowerCase(),
          name,
          bio,
          imageUrl,
          onboarded: true,
        },
      });

      console.log("user Updated Successfully!");
    }

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function getUser(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
  }
}
