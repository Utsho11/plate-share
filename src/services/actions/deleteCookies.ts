"use server";

import { cookies } from "next/headers";

export const deleteCookies = async () => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
  //   keys.forEach(async (key) => {
  //   });
};