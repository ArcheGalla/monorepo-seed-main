"use client";

import { FC, useEffect } from "react";

import { IUser } from "@/types/user";
import { useUserStore } from "@/store/useUserStore";

interface UserSetProps {
  user: IUser;
}

export const UserSet: FC<UserSetProps> = ({ user }) => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    console.log("user", user);
    setUser(user);
  }, [user, setUser]);

  return null;
};
