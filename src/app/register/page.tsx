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
import { registerUser } from "@/src/services/actions/registerUser";
import { userLogin } from "@/src/services/actions/userLogin";
import { storeUserInfo } from "@/src/services/auth.services";
import modifyPayload from "@/src/utils/modifyPayload";
import { Label } from "@radix-ui/react-label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (values: FieldValues) => {
    // console.log(values);
setIsLoading(true)
    const data = modifyPayload(values);
    const res = await registerUser(data);
    try {
      // console.log(res);
      if (res.data.id) {
        toast.success(res?.message);
        const result = await userLogin({
          email: values.email,
          password: values.password,
        });
        if (result.data.accessToken) {
          storeUserInfo(result?.data?.accessToken);
          router.push("/home");
        }
      } 
    } catch (error) {
      console.log(error);
      toast.error(res.message)
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <Logo size="lg"/>

      <Card className="w-full max-w-sm mt-8 shadow-sm">
        <PSForm onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold">
              Create Your Account
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <PSInput
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>

            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="firstName">First Name</Label>
                <PSInput
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName">Last Name</Label>
                <PSInput
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            {/* Age & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="age">Age</Label>
                <PSInput
                  name="age"
                  type="age"
                  placeholder="Your age"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <PSInput
                  name="mobileNumber"
                  type="tel"
                  placeholder="e.g. 01XXXXXXXXX"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1">
              <Label htmlFor="location">Location</Label>
              <PSInput
                name="location"
                type="text"
                placeholder="Enter your location"
                required
              />
            </div>

            {/* Password */}
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
                placeholder="Create a strong password"
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 mt-2">
            <Button type="submit" className="w-full"    disabled={isLoading}>
               {
       isLoading? <><Loader2 className="size-4 animate-spin" />
    Registering...</>:<>Sign up</>
      }
            </Button>
          </CardFooter>
        </PSForm>
      </Card>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6 w-full max-w-sm">
        <span className="grow border-t border-gray-300"></span>
        <span className="text-gray-500 text-sm">Already have an account?</span>
        <span className="grow border-t border-gray-300"></span>
      </div>

      <Link href="/login" className="w-full max-w-sm">
        <Button
          variant="outline"
          className="w-full rounded-full border-gray-800"
       
        >
          Sign In
        </Button>
      </Link>
    </div>
  );
};

export default RegisterPage;
