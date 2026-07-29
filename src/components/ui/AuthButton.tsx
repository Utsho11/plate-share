"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/src/services/auth.services";
import { logoutUser } from "@/src/services/actions/logoutUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import {
  User,
  LayoutDashboard,
  ShieldAlert,
  Bookmark,
  Crown,
  LogOut,
  LogIn,
} from "lucide-react";

const AuthButton = () => {
  const userInfo = getUserInfo();
  const router = useRouter();

  const handleLogOut = () => {
    logoutUser(router);
  };

  const isAdmin = userInfo?.role === "admin";

  return (
    <>
      {userInfo?.id ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer border-2 border-orange-400 hover:border-orange-500 transition shadow-xs w-9 h-9">
              <AvatarImage src={userInfo.profilePhoto} alt={userInfo.name || "User"} />
              <AvatarFallback className="bg-orange-500 text-white font-bold text-xs">
                {userInfo.name
                  ? userInfo.name
                      .split(" ")
                      .map((word: string) => word[0])
                      .join("")
                      .toUpperCase()
                  : "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-60 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xl rounded-2xl p-1.5" align="end">
            <DropdownMenuLabel className="px-3 py-2">
              <div className="flex flex-col space-y-0.5">
                <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                  {userInfo.name || "Logged In User"}
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                  {userInfo.email || "user@plateshare.com"}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup className="space-y-0.5">
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/user/profile"
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl cursor-pointer hover:bg-orange-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition"
                >
                  <User className="w-4 h-4 text-orange-500" />
                  My Profile &amp; Settings
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/user"
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl cursor-pointer hover:bg-orange-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition"
                >
                  <LayoutDashboard className="w-4 h-4 text-blue-500" />
                  User Workspace
                </Link>
              </DropdownMenuItem>

              {isAdmin && (
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/admin"
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl cursor-pointer hover:bg-orange-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition"
                  >
                    <ShieldAlert className="w-4 h-4 text-red-500" />
                    Admin Control Panel
                  </Link>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem asChild>
                <Link
                  href="/saved"
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl cursor-pointer hover:bg-orange-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition"
                >
                  <Bookmark className="w-4 h-4 text-emerald-500" />
                  Saved Cookbook
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/user/profile"
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl cursor-pointer hover:bg-orange-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition"
                >
                  <Crown className="w-4 h-4 text-amber-500" />
                  Pro Membership &amp; Perks
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogOut}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login">
          <Button
            size="sm"
            className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20"
          >
            <LogIn className="w-3.5 h-3.5 mr-1.5" /> Sign In
          </Button>
        </Link>
      )}
    </>
  );
};

export default AuthButton;
