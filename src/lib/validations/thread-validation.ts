import { z } from "zod";

export const ThreadValidation = z.object({
  thread: z.string().min(3).max(1000),
  userId: z.string(),
});

export const CommentValidation = z.object({
  thread: z.string().min(3).max(1000),
});

export type ThreadType = z.infer<typeof ThreadValidation>;
export type CommentType = z.infer<typeof CommentValidation>;
