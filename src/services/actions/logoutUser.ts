import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { deleteCookies } from "./deleteCookies";
import { authKey } from "@/src/constants/constants";

export const logoutUser = (router: AppRouterInstance) => {
  deleteCookies();
  localStorage.removeItem(authKey);
  router.push("/");
  router.refresh();
};
