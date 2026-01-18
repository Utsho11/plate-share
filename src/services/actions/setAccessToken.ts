/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { authKey } from "@/src/constants/constants";
import { cookies } from "next/headers";


const setAccessToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set(authKey, token);


};

export default setAccessToken;
