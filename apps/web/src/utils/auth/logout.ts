"use server";

import { deleteJWTToken } from "@/utils/cookies/jwt";

export const logout = async () => {
  await deleteJWTToken();
};
