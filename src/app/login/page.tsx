"use client";

import PSForm from "@/src/components/Form/PSForm";
import PSInput from "@/src/components/Form/PSInput";
import Logo from "@/src/components/logo/Logo";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import { userLogin } from "@/src/services/actions/userLogin";
import { storeUserInfo } from "@/src/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Eye, EyeOff, Loader2, Crown, UserCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const validationScheme = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (values: FieldValues) => {
    setIsLoading(true);
    try {
      const res = await userLogin(values);
      if (res?.data?.accessToken) {
        toast.success(res?.message || "Successfully logged in!");
        storeUserInfo(res.data.accessToken);
        router.push("/home");
      } else {
        toast.error(res?.message || "Invalid credentials!");
      }
    } catch {
      toast.error("Login failed. Please check backend connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (email: string, pass: string, roleName: string) => {
    toast.info(`Logging in as Demo ${roleName}...`);
    await handleSubmit({ email, password: pass });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-50/50 dark:bg-slate-950">
      <Logo size="lg" />

      {/* 1-Click Demo Accounts Quick Login Box */}
      <Card className="w-full max-w-sm mt-6 border-2 border-orange-400/40 bg-linear-to-br from-orange-50/80 to-amber-50/50 dark:from-slate-900 dark:to-slate-800 shadow-md rounded-2xl overflow-hidden">
        <CardHeader className="pb-3 text-center">
          <div className="inline-flex items-center justify-center gap-1.5 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold mx-auto shadow-xs">
            <Sparkles size={13} /> Demo Access Credentials
          </div>
          <CardTitle className="text-sm font-bold text-gray-800 dark:text-gray-100 mt-2">
            One-Click Quick Experience
          </CardTitle>
          <CardDescription className="text-xs text-gray-500">
            Click below to instantly explore admin &amp; user features
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2.5 pb-4">
          <Button
            type="button"
            disabled={isLoading}
            onClick={() => handleDemoLogin("admin@gmail.com", "password123", "Admin")}
            className="w-full h-11 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-between px-4 transition"
          >
            <span className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Login as Demo Admin</span>
            </span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md font-mono">admin@gmail.com</span>
          </Button>

          <Button
            type="button"
            disabled={isLoading}
            onClick={() => handleDemoLogin("user@gmail.com", "password123", "User")}
            className="w-full h-11 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-between px-4 transition"
          >
            <span className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-orange-100" />
              <span>Login as Demo User</span>
            </span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md font-mono">user@gmail.com</span>
          </Button>
        </CardContent>
      </Card>

      {/* Main Login Form */}
      <Card className="w-full max-w-sm mt-4 shadow-sm rounded-2xl border">
        <PSForm
          onSubmit={handleSubmit}
          resolver={zodResolver(validationScheme)}
          defaultValues={{
            email: "",
            password: "",
          }}
        >
          <CardHeader className="pt-5 pb-2">
            <CardTitle className="text-center text-xl font-bold">
              Sign In to Your Account
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs font-semibold">Email</Label>
              <PSInput
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold">Password</Label>
                <Button
                  type="button"
                  variant="link"
                  className="px-0 text-xs h-auto py-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5 mr-1" /> Hide
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 mr-1" /> Show
                    </>
                  )}
                </Button>
              </div>

              <PSInput
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 my-2">
            <Button type="submit" className="w-full font-bold py-5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" /> Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>

            <Link
              href="/forgot-password"
              className="text-xs text-orange-600 hover:underline self-end"
            >
              Forgot your password?
            </Link>
          </CardFooter>
        </PSForm>
      </Card>

      {/* Divider */}
      <div className="flex items-center gap-3 my-4 w-full max-w-sm">
        <span className="flex-grow border-t border-gray-200"></span>
        <span className="text-gray-400 text-xs">New to PlateShare?</span>
        <span className="flex-grow border-t border-gray-200"></span>
      </div>

      <Link href="/register" className="w-full max-w-sm">
        <Button
          variant="outline"
          className="w-full rounded-xl border-gray-300 font-semibold"
        >
          Create New Account
        </Button>
      </Link>
    </div>
  );
};

export default LoginPage;
