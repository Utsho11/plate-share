"use client";
import Logo from "@/src/components/logo/Logo";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex justify-center items-center p-2">
      <div className="flex-col w-[400px]">
        <Logo />
        <Card className="w-full max-w-sm my-8">
          <form>
            <CardHeader>
              <CardTitle className="text-center">Sign in</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Button
                    variant="link"
                    className="ml-auto"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <>
                        <Eye /> Show
                      </>
                    ) : (
                      <>
                        <EyeOff /> Hide
                      </>
                    )}
                  </Button>
                </div>
                <Input
                  id="password"
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full my-2">
                Login
              </Button>
              <Link
                href={"/forgot-password"}
                className="ml-auto underline hover:no-underline"
              >
                Forget your password?
              </Link>
            </CardFooter>
          </form>
        </Card>
        <div className="flex justify-center items-center my-4">
          <div className="border  md:w-1/4"></div>
          <h3 className="text-slate-500 mx-2">New to Community</h3>
          <div className="border  md:w-1/4"></div>
        </div>
        <Link href={"/register"}>
          <Button
            variant={"outline"}
            className="w-full border-black rounded-3xl"
          >
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
