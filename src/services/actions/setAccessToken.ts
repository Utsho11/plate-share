/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";


import { authKey } from "@/src/Constants/Constants";
import { decodedToken } from "@/src/utils/jwt";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";

const setAccessToken = async (token: string, option?: any) => {
  const cookieStore = await cookies();
  cookieStore.set(authKey, token);

  const decodedData = decodedToken(token) as any;

  if (option && option.passwordChangeRequired) {
    if (decodedData?.role === "PATIENT") redirect("/dashboard");
    else redirect("/dashboard/change-password");
  }
  if (option && !option.passwordChangeRequired && option.redirect) {
    redirect(option.redirect);
  }
};

export default setAccessToken;