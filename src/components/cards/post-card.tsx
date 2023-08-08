"use client";

import { Comment, Community, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PostCardProps {
  id: string;
  currentUserId: string;
  content: string;
  author: User;
  createdAt: Date;
  comments: Comment[];
  community: Community | null;
  isComment?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  author,
  comments,
  content,
  createdAt,
  currentUserId,
  id,
  isComment,
}) => {
  return (
    <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.imageUrl!}
                alt="author"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link
              className="w-fit text-light-1 cursor-pointer text-base-semibold"
              href={`/profile/${author.id}`}
            >
              {author.name}
            </Link>
            <p className="mt-2 text-small-regular text-light-2">{content}</p>
            <div className="mt-5 flex-col gap-3 ">
              <div className="flex gap-3.5">
                <Image
                  src="/assets/heart-gray.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="object-contain cursor-pointer"
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="object-contain cursor-pointer"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="object-contain cursor-pointer"
                />
                <Image
                  src="/assets/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                  className="object-contain cursor-pointer"
                />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
