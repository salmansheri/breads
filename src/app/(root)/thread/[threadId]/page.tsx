import PostCard from "@/components/cards/post-card";
import Comment from "@/components/forms/comment";
import { getThreadById } from "@/lib/actions/thread.action";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { Thread } from "@prisma/client";
import { redirect } from "next/navigation";

interface Params {
  threadId: string;
}

export default async function ThreadDetailsPage({
  params,
}: {
  params: Params;
}) {
  const { threadId } = params;
  if (!threadId) {
    return null;
  }

  const user = await currentUser();

  const userInfo = await getUser(user?.id as string);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await getThreadById(threadId);

  return (
    <section className="relative">
      <div>
        <PostCard
          // @ts-ignore
          id={thread?.id}
          currentUserId={user?.id!}
          // @ts-ignore
          content={thread?.text!}
          // @ts-ignore
          author={thread?.user!}
          // @ts-ignore
          createdAt={thread?.createdAt!}
          // @ts-ignore
          comments={thread?.comments!}
          // @ts-ignore
          community={thread?.community!}
        />
      </div>
      <div className="mt-7">
        <Comment
          // @ts-ignore
          threadId={thread.id as string}
          currentUserImage={user?.imageUrl!}
          currentUserId={userInfo.userId}
        />
      </div>
      <div className="mt-10 ">
        {/* @ts-ignore  */}
        {thread?.comments?.map((comment) => (
          <PostCard
            key={comment.id}
            // @ts-ignore
            id={comment?.id}
            currentUserId={user?.id!}
            // @ts-ignore
            content={comment?.text!}
            // @ts-ignore
            author={comment?.user!}
            // @ts-ignore
            createdAt={comment?.createdAt!}
            // @ts-ignore
            comments={comment?.comments!}
            // @ts-ignore
            community={comment?.community!}
          />
        ))}
      </div>
    </section>
  );
}
