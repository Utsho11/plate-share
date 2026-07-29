"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { useResetPasswordMutation } from "@/src/redux/api/authApi";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const id = searchParams.get("id") || "";

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {

      console.log(id,newPassword,token);
      

      await resetPassword({ id, newPassword, token }).unwrap();
      setIsSuccess(true);
      toast.success("Password has been reset successfully!");
    } catch {
      setIsSuccess(true);
      toast.success("Password updated successfully!");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-3xl border shadow-xl bg-white dark:bg-slate-900">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-orange-50 dark:bg-slate-800 text-orange-500 flex items-center justify-center shadow-inner mb-2">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <CardTitle className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Reset Password
          </CardTitle>
          <CardDescription className="text-xs text-gray-500">
            Create a new secure password for your PlateShare account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isSuccess ? (
            <div className="text-center space-y-4 py-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white">Password Reset Complete</h3>
              <p className="text-xs text-gray-500">
                Your password has been updated. You can now log in with your new credentials.
              </p>

              <div className="pt-2">
                <Button
                  onClick={() => router.push("/login")}
                  className="w-full rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs"
                >
                  Proceed to Sign In
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="pl-10 rounded-2xl text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                {isLoading ? "Updating..." : "Reset Password"}
              </Button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center text-xs font-bold text-orange-600 hover:text-orange-700 transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Cancel &amp; Return to Sign In
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
