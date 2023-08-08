"use client";

import {
  ThreadType,
  ThreadValidation,
} from "@/lib/validations/thread-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { createThread } from "@/lib/actions/thread.action";
import { Loader2 } from "lucide-react";

interface PostThreadProps {
  userId: string;
}

const PostThread: FC<PostThreadProps> = ({ userId }) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<ThreadType>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      userId: userId,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<ThreadType> = async (data: ThreadType) => {
    await createThread({
      text: data.thread,
      userId,
      path: pathname,
    });

    router.refresh();

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 flex flex-col"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea
                  rows={15}
                  placeholder="Enter the content"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Posting
            </>
          ) : (
            <>Post Thread</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default PostThread;
