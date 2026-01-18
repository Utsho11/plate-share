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
} from "@/src/components/ui/card";
import { userLogin } from "@/src/services/actions/userLogin";
import { storeUserInfo } from "@/src/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const validationScheme = z.object({
  email: z.email("Please enter a valid email address!"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const LoginPage = () => {
  // const [error, setError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleSubmit = async (values: FieldValues) => {
    // console.log(values);
    setIsLoading(true)
    const res = await userLogin(values);
    try {      
      if (res.data.accessToken) {
        toast.success(res?.message);
        storeUserInfo(res?.data?.accessToken);
        router.push("/home");
      } 
    } catch (err) {
      console.log("Error:",err);
      toast.error(res?.message || "Something went wrong!!");
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <Logo />

      <Card className="w-full max-w-sm mt-8 shadow-sm">
        <PSForm
          onSubmit={handleSubmit}
          resolver={zodResolver(validationScheme)}
          defaultValues={{
            email: "",
            password: "",
          }}
        >
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold">
              Sign In
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <PSInput
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button
                  type="button"
                  variant="link"
                  className="px-0 text-sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-1" /> Hide
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-1" /> Show
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

          <CardFooter className="flex flex-col gap-3 my-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
      {
       isLoading? <><Loader2 className="size-4 animate-spin" />
    Loging in..</>:<>Login</>
      }
            </Button>

            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline self-end"
            >
              Forgot your password?
            </Link>
          </CardFooter>
        </PSForm>
      </Card>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6 w-full max-w-sm">
        <span className="flex-grow border-t border-gray-300"></span>
        <span className="text-gray-500 text-sm">New here?</span>
        <span className="flex-grow border-t border-gray-300"></span>
      </div>

      <Link href="/register" className="w-full max-w-sm">
        <Button
          variant="outline"
          className="w-full rounded-full border-gray-800"
        >
          Create Account
        </Button>
      </Link>
    </div>
  );
};

export default LoginPage;
