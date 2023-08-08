"use client";

import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import React from "react";
import { AvatarImage } from "./avatar";

interface Props {
  src?: string;
  name?: string;
}

const UserAvatar = ({ src, name }: Props) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback className="w-full flex items-center justify-center">
        {name?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
