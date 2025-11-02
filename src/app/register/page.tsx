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

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="min-h-screen flex justify-center items-center p-2">
      <div className="flex-col w-[400px]">
        <Logo />
        <Card className="w-full max-w-sm my-8">
          <form>
            <CardHeader>
              <CardTitle className="text-center">Sign up</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  {" "}
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="firstName"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div>
                  {" "}
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="lastName"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  {" "}
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="age"
                    placeholder="Enter your age"
                    required
                  />
                </div>
                <div>
                  {" "}
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <Input
                    id="mobileNumber"
                    type="mobileNumber"
                    placeholder="Enter your mobile number"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  type="location"
                  placeholder="Enter your location"
                  required
                />
              </div>
              <div className=" gap-2">
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
                  placeholder="Enter a password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full my-2">
                Sign up
              </Button>
            </CardFooter>
          </form>
        </Card>
        <div className="flex justify-center items-center my-4">
          <div className="border  md:w-1/4"></div>
          <h3 className="text-slate-500 mx-2">Already have an account?</h3>
          <div className="border  md:w-1/4"></div>
        </div>
        <Link href={"/login"}>
          <Button
            variant={"outline"}
            className="w-full border-black rounded-3xl"
          >
            Sign in
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
