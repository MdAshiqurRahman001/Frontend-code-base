"use server";
import { cookies } from "next/headers";

export const setCookie = async (token: string, refreshToken?: string) => {
  const cookieStore = await cookies();
  cookieStore.set("auth-token", token);
  cookieStore.set("token", token);
  if (refreshToken) {
    cookieStore.set("refresh-token", refreshToken);
  }
};

export const removeCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
  cookieStore.delete("token");
  cookieStore.delete("refresh-token");
};
