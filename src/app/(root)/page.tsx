import PostCard from "@/components/cards/post-card";
import Heading from "@/components/ui/heading";
import UserAvatar from "@/components/ui/user-avatar";
import { getThreads } from "@/lib/actions/thread.action";
import { getUser } from "@/lib/actions/user.actions";
import { UserButton, currentUser } from "@clerk/nextjs";

export default async function Home() {
  const { posts, isNext } = await getThreads(1, 30);
  const user = await currentUser();

  return (
    <>
      <Heading title="Home" />

      <section className="my-9 flex flex-col gap-10">
        {posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                currentUserId={user?.id!}
                content={post.text}
                author={post.user}
                createdAt={post.createdAt}
                comments={post.comments}
                community={post.community}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
