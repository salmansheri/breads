"use client";

import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CommentType,
  CommentValidation,
} from "@/lib/validations/thread-validation";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import UserAvatar from "../ui/user-avatar";
import { addCommentToThread } from "@/lib/actions/thread.action";
import { toast } from "../ui/use-toast";

interface CommentProps {
  threadId: string;
  currentUserImage: string;
  currentUserId: string;
}

const Comment: React.FC<CommentProps> = ({
  threadId,
  currentUserImage,
  currentUserId,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<CommentType>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (data: CommentType) => {
    // @ts-ignore
    const { message, error } = await addCommentToThread({
      commentText: data.thread,
      path: pathname,
      threadId,
      userId: currentUserId,
    });

    if (error) {
      return toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }

    return toast({
      title: "Successfully created comment",
    });
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row items-center w-full gap-3"
      >
        <FormField
          name="thread"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2">
              <FormLabel className="">
                <UserAvatar src={currentUserImage} name={currentUserId} />
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Comment"
                  {...field}
                  className=" no-focus text-light-1 outline-none border-none"
                  cols={55}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="rounded-full" type="submit">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Loading...
            </>
          ) : (
            "Comment"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
