"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Lock,
  Crown,
  ChefHat,
  Save,
  CheckCircle2,
  ShieldCheck,
  Trash2,
  Edit,
  Loader2,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { toast } from "sonner";
import SubscriptionModal from "@/src/components/Subscription/SubscriptionModal";
import {
  useGetMeQuery,
  useUpdateMyProfileMutation,
} from "@/src/redux/api/userApi";
import { useChangePasswordMutation } from "@/src/redux/api/authApi";
import { useGetMyRecipesQuery, useDeleteRecipeMutation } from "@/src/redux/api/recipeApi";

type ProfileTab = "info" | "security" | "subscription" | "recipes";

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("info");
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  // ── API Queries ──────────────────────────────────────────────
  const { data: meData, isLoading: meLoading, refetch: refetchMe } =
    useGetMeQuery(undefined);
  const [updateMyProfile, { isLoading: isSaving }] = useUpdateMyProfileMutation();
  const [changePassword, { isLoading: isChangingPwd }] = useChangePasswordMutation();

  const user = meData?.data;

  // Fetch user's own recipes
  const { data: myRecipesData, isLoading: recipesLoading, refetch: refetchRecipes } =
    useGetMyRecipesQuery(undefined);
  const [deleteRecipe] = useDeleteRecipeMutation();

  // ── Form States ───────────────────────────────────────────────
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  // Sync form with fetched user data
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setMobileNumber(user.mobileNumber || "");
      setLocation(user.location || "");
      setAge(user.age ? String(user.age) : "");
      setBio(user.bio || "");
      setProfilePhoto(user.profilePhoto || "");
    }
  }, [user]);

  // ── Password State ────────────────────────────────────────────
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ── Recipe data ───────────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const myRecipes = (myRecipesData?.recipies || []).map((r: Record<string, any>) => ({
    id: (r._id || r.id) as string,
    title: (r.title as string) || "Untitled",
    category: (r.category as string) || "—",
    upvotes: (r.upvoteCount as number) || 0,
    recipeStatus: (r.recipeStatus as string) || "REGULAR",
  }));

  // ── Handlers ──────────────────────────────────────────────────
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMyProfile({
        firstName,
        lastName,
        mobileNumber,
        location,
        age: age ? Number(age) : undefined,
        profilePhoto,
        bio,
      }).unwrap();
      toast.success("Profile updated successfully!");
      refetchMe();
    } catch {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    try {
      await changePassword({ oldPassword, newPassword }).unwrap();
      toast.success("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Failed to change password. Check your current password and try again.");
    }
  };

  const handleDeleteRecipe = async (id: string, title: string) => {
    try {
      await deleteRecipe(id).unwrap();
      toast.success(`"${title}" deleted.`);
      refetchRecipes();
    } catch {
      toast.error("Failed to delete recipe. Please try again.");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Profile Card */}
      {meLoading ? (
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 rounded-3xl p-6 text-white shadow-xl flex items-center justify-center h-32">
          <Loader2 size={28} className="animate-spin text-white/70" />
        </div>
      ) : (
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <Avatar className="w-20 h-20 border-4 border-white/80 shadow-md">
                <AvatarImage src={profilePhoto} />
                <AvatarFallback className="bg-white text-orange-600 font-bold text-2xl">
                  {firstName?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">
                  {firstName} {lastName}
                </h1>
                {user?.type === "PREMIUM" && (
                  <Badge className="bg-white/20 text-white border-0 text-[10px] uppercase font-bold">
                    PRO Member
                  </Badge>
                )}
              </div>
              <p className="text-xs text-orange-100 mt-1">
                {email}
                {location ? ` • ${location}` : ""}
              </p>
              {bio && (
                <p className="text-xs text-amber-100 mt-1 italic">
                  &quot;{bio}&quot;
                </p>
              )}
            </div>
          </div>

          <Button
            onClick={() => setIsSubModalOpen(true)}
            className="bg-white text-orange-600 hover:bg-orange-50 font-bold rounded-2xl shadow-md text-xs"
          >
            <Crown className="w-4 h-4 mr-1.5 text-amber-500" /> Manage Membership
          </Button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b pb-2 overflow-x-auto">
        {[
          { id: "info", label: "Personal Info", icon: User },
          { id: "security", label: "Security & Password", icon: Lock },
          { id: "subscription", label: "Pro Membership", icon: Crown },
          { id: "recipes", label: "My Published Content", icon: ChefHat },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ProfileTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                isActive
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Tab 1: Personal Information ───────────────────────── */}
      {activeTab === "info" && (
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Edit Personal Information</CardTitle>
            <CardDescription>
              Update your public profile and contact info
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    First Name
                  </label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="rounded-xl"
                    placeholder="First name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Last Name
                  </label>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="rounded-xl"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Email Address (Read-Only)
                  </label>
                  <Input
                    value={email}
                    disabled
                    className="rounded-xl bg-gray-100 dark:bg-slate-800 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Mobile Number
                  </label>
                  <Input
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="rounded-xl"
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Location
                  </label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="rounded-xl"
                    placeholder="City, Country"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Age
                  </label>
                  <Input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="rounded-xl"
                    placeholder="Your age"
                    min={1}
                    max={120}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Profile Photo URL
                </label>
                <Input
                  value={profilePhoto}
                  onChange={(e) => setProfilePhoto(e.target.value)}
                  className="rounded-xl"
                  placeholder="https://example.com/your-photo.jpg"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Bio Description
                </label>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="rounded-xl min-h-[80px]"
                  placeholder="Tell the community a bit about yourself..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-1.5" />
                )}
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* ── Tab 2: Security & Password ────────────────────────── */}
      {activeTab === "security" && (
        <Card className="rounded-2xl border shadow-sm max-w-xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-orange-500" /> Security &amp;
              Password
            </CardTitle>
            <CardDescription>Change your account password securely</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Current Password
                </label>
                <Input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  className="rounded-xl"
                  placeholder="Enter your current password"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  New Password
                </label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="rounded-xl"
                  placeholder="At least 6 characters"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="rounded-xl"
                  placeholder="Repeat your new password"
                />
              </div>

              <Button
                type="submit"
                disabled={isChangingPwd}
                className="w-full py-5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md"
              >
                {isChangingPwd ? (
                  <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                ) : (
                  <Lock className="w-4 h-4 mr-1.5" />
                )}
                {isChangingPwd ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* ── Tab 3: Pro Membership ─────────────────────────────── */}
      {activeTab === "subscription" && (
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" /> PlateShare Pro Status
            </CardTitle>
            <CardDescription>
              Manage your subscription plan and billing perks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {meLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin text-gray-400" size={24} />
              </div>
            ) : (
              <>
                <div className="p-5 rounded-2xl bg-orange-50 dark:bg-slate-800 border border-orange-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <Badge
                      className={`font-bold mb-2 ${
                        user?.type === "PREMIUM"
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {user?.type === "PREMIUM" ? "ACTIVE PRO PASS" : "FREE TIER"}
                    </Badge>
                    <h3 className="font-bold text-base text-gray-900 dark:text-white">
                      {user?.type === "PREMIUM"
                        ? "PlateShare Pro Member"
                        : "PlateShare Regular Member"}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {user?.type === "PREMIUM"
                        ? "You have full access to all premium features."
                        : "Upgrade to Pro to unlock all premium features."}
                    </p>
                  </div>
                  <Button
                    onClick={() => setIsSubModalOpen(true)}
                    className="rounded-xl bg-orange-500 text-white font-bold text-xs"
                  >
                    {user?.type === "PREMIUM" ? "Change Plan" : "Upgrade to Pro"}
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    {user?.type === "PREMIUM"
                      ? "Your Unlocked Pro Perks"
                      : "What you get with Pro"}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {[
                      "Unlimited Hands-Free Cook Mode",
                      "7-Day Meal Planner & Grocery Export",
                      "Secret Master Chef Recipes",
                      "Verified PRO Badge on Profile",
                    ].map((perk) => (
                      <div
                        key={perk}
                        className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-slate-900 border"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 ${
                            user?.type === "PREMIUM"
                              ? "text-emerald-500"
                              : "text-gray-300"
                          }`}
                        />
                        {perk}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* ── Tab 4: My Published Content ───────────────────────── */}
      {activeTab === "recipes" && (
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">My Published Recipes</CardTitle>
              <CardDescription>
                Manage and edit your community recipe posts
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">
              {myRecipes.length} Recipes
            </Badge>
          </CardHeader>

          <CardContent className="p-0 divide-y">
            {recipesLoading ? (
              <div className="flex items-center justify-center py-12 gap-3 text-gray-400">
                <Loader2 size={20} className="animate-spin" />
                <span className="text-sm">Loading your recipes...</span>
              </div>
            ) : myRecipes.length === 0 ? (
              <div className="text-center py-12 text-sm text-gray-400">
                You haven&apos;t published any recipes yet.
              </div>
            ) : (
              myRecipes.map(
                (recipe: {
                  id: string;
                  title: string;
                  category: string;
                  upvotes: number;
                  recipeStatus: string;
                }) => (
                  <div
                    key={recipe.id}
                    className="p-4 flex items-center justify-between hover:bg-gray-50/50"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                        {recipe.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <Badge variant="outline">{recipe.category}</Badge>
                        <span>•</span>
                        <span className="text-emerald-600 font-bold">
                          {recipe.upvotes} Upvotes
                        </span>
                        <Badge
                          variant={
                            recipe.recipeStatus === "PREMIUM"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {recipe.recipeStatus}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/user/recipes?edit=${recipe.id}`}>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleDeleteRecipe(recipe.id, recipe.title)
                        }
                        className="text-xs text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                )
              )
            )}
          </CardContent>
        </Card>
      )}

      <SubscriptionModal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
      />
    </div>
  );
}
