"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Send, CheckCircle2, KeyRound } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { useForgetPasswordMutation } from "@/src/redux/api/authApi";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your registered email address.");
      return;
    }

    try {
      await forgetPassword({ email }).unwrap();
      setIsSent(true);
      toast.success("Password reset instructions have been sent to your email!");
    } catch {
      toast.success("Password reset instructions sent! Check your inbox.");
      setIsSent(true);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-3xl border shadow-xl bg-white dark:bg-slate-900">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-orange-50 dark:bg-slate-800 text-orange-500 flex items-center justify-center shadow-inner mb-2">
            <KeyRound className="w-7 h-7" />
          </div>
          <CardTitle className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Forgot Password?
          </CardTitle>
          <CardDescription className="text-xs text-gray-500">
            Enter your email and we&apos;ll send you instructions to reset your password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isSent ? (
            <div className="text-center space-y-4 py-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white">Check Your Inbox</h3>
              <p className="text-xs text-gray-500">
                We sent a password reset link to <strong className="text-gray-800 dark:text-gray-200">{email}</strong>.
              </p>

              <div className="pt-2">
                <Link href="/login">
                  <Button className="w-full rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs">
                    Return to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 rounded-2xl text-xs"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20"
              >
                {isLoading ? (
                  "Sending Link..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" /> Send Reset Link
                  </>
                )}
              </Button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center text-xs font-bold text-orange-600 hover:text-orange-700 transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
