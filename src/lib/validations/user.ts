import { z } from "zod";

export const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: "Minimum Three Characters" })
    .max(30, { message: "Characters Must be below 30 characters" }),
  username: z.string().min(3).max(30),
  bio: z.string().min(3).max(1000),
});

export type UserType = z.infer<typeof UserValidation>;
