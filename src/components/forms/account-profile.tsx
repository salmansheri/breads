"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserType, UserValidation } from "@/lib/validations/user";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";

interface AccountProfileProps {
  user: {
    id: string;
    objectId: string;
    username: string;
    bio: string;
    image: string;
    name: string;
  };
  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: AccountProfileProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");

  const pathname = usePathname();
  const router = useRouter();

  const form = useForm<UserType>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      name: user?.name || "",
      bio: "",
      profile_photo: user?.image || "",
      username: user?.username || "",
    },
  });

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    change: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event?.target?.result?.toString();
        change(imageDataUrl as string);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<UserType> = async (data: UserType) => {
    const blob = data.profile_photo;

    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      const imgResponse = await startUpload(files);
      if (imgResponse && imgResponse[0].fileUrl) {
        data.profile_photo = imgResponse[0].fileUrl;
      }
    }

    await updateUser({
      userId: user.id,
      username: data.username,
      name: data.name,
      bio: data.bio,
      imageUrl: data.profile_photo,
      path: pathname,
    });

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 flex flex-col justify-start"
      >
        <FormField
          name="profile_photo"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex w-full  items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt=""
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200 ">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload Photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the Name" {...field} />
              </FormControl>
              <FormDescription>Enter the Name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter the Username" {...field} />
              </FormControl>
              <FormDescription>Enter the Username</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="bio"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  placeholder="Enter the Username"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter the Bio</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="" variant="default" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
