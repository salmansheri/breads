import Heading from "@/components/ui/heading";
import PostThread from "@/components/forms/post-thread";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export default async function CreateThreadPage() {
  const user = await currentUser();

  if (!user) {
    return null;
    redirect("/sign-in");
  }

  const userInfo = await getUser(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }
  return (
    <React.Fragment>
      <Heading title="Create Threads" subtitle="Create a new Thread" />
      <PostThread userId={userInfo.userId} />
    </React.Fragment>
  );
}
