"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prismaDB";

interface Params {
  text: string;
  userId: string;
  communityId?: string;
  path: string;
}

export async function createThread({
  userId,

  path,
  text,
}: Params) {
  try {
    await prisma.thread.create({
      data: {
        text,
        userId,
      },
    });

    revalidatePath(path);
  } catch (error: any) {
    console.log(error);
    return {
      error: error.message,
    };
  }
}

export async function getThreads(pageNumber = 1, pageSize = 20) {
  // Calculate the number of posts to skip

  const skipAmount = (pageNumber - 1) * pageSize;

  const posts = await prisma.thread.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: skipAmount,
    take: pageSize,
    include: {
      comments: {
        include: {
          user: true,
        },
      },
      user: true,
      community: true,
    },
  });

  const totalPostsCount = await prisma.thread.count();

  const isNext = totalPostsCount > skipAmount + posts.length;

  return {
    posts,
    isNext,
  };
}

export async function getThreadById(id: string) {
  try {
    const post = await prisma.thread.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });

    return post;
  } catch (error: any) {
    console.log(error);
    return {
      error: error.message,
    };
  }
}

export async function addCommentToThread({
  threadId,
  commentText,
  userId,
  path,
}: {
  threadId: string;
  commentText: string;
  userId: string;
  path: string;
}) {
  try {
    await prisma.comment.create({
      data: {
        text: commentText,
        userId,
        threadId,
      },
    });

    revalidatePath(path);

    return {
      message: "success",
    };
  } catch (error: any) {
    console.log(error);
    return {
      error: error.message,
    };
  }
}
