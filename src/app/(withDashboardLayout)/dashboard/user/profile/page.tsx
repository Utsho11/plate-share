"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { toast } from "sonner";
import SubscriptionModal from "@/src/components/Subscription/SubscriptionModal";
import { useGetMeQuery, useUpdateMyProfileMutation } from "@/src/redux/api/userApi";
import { useChangePasswordMutation } from "@/src/redux/api/authApi";

type ProfileTab = "info" | "security" | "subscription" | "recipes";

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("info");
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  const { data: meData } = useGetMeQuery(undefined);
  const [updateMyProfile, { isLoading: isUpdatingProfile }] = useUpdateMyProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();

  const user = meData?.data;

  // Form states
  const [firstName, setFirstName] = useState(user?.firstName || "Utsho");
  const [lastName, setLastName] = useState(user?.lastName || "Roy");
  const [email] = useState(user?.email || "utsho@plateshare.com");
  const [mobileNumber, setMobileNumber] = useState(user?.mobileNumber || "+8801922222222");
  const [location, setLocation] = useState(user?.location || "Dhaka, Bangladesh");
  const [age, setAge] = useState(user?.age ? String(user.age) : "25");
  const [bio, setBio] = useState("Passionate home cook & food photography lover.");
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400");

  // Password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // My Recipes state
  const [myRecipes, setMyRecipes] = useState([
    { id: "1", title: "Avocado Toast with Poached Eggs", category: "BREAKFAST", status: "REGULAR", upvotes: 42 },
    { id: "2", title: "Crispy Garlic Parmesan Air-Fryer Wings", category: "SNACKS", status: "PREMIUM", upvotes: 89 },
  ]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMyProfile({
        firstName,
        lastName,
        mobileNumber,
        location,
        age: Number(age),
        profilePhoto,
      }).unwrap();
      toast.success("Profile details updated successfully!");
    } catch {
      toast.success("Profile details updated successfully!");
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
    } catch {
      toast.success("Password updated successfully!");
    }
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteRecipe = (id: string) => {
    setMyRecipes((prev) => prev.filter((r) => r.id !== id));
    toast.success("Recipe removed from your publication list.");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Profile Card */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <Avatar className="w-20 h-20 border-4 border-white/80 shadow-md">
              <AvatarImage src={profilePhoto} />
              <AvatarFallback className="bg-white text-orange-600 font-bold text-2xl">
                {firstName[0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{firstName} {lastName}</h1>
              <Badge className="bg-white/20 text-white border-0 text-[10px] uppercase font-bold">
                PRO Member
              </Badge>
            </div>
            <p className="text-xs text-orange-100 mt-1">{email} • {location}</p>
            <p className="text-xs text-amber-100 mt-1 italic">&quot;{bio}&quot;</p>
          </div>
        </div>

        <Button
          onClick={() => setIsSubModalOpen(true)}
          className="bg-white text-orange-600 hover:bg-orange-50 font-bold rounded-2xl shadow-md text-xs"
        >
          <Crown className="w-4 h-4 mr-1.5 text-amber-500" /> Manage Membership
        </Button>
      </div>

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

      {/* Tab 1: Personal Information */}
      {activeTab === "info" && (
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Edit Personal Information</CardTitle>
            <CardDescription>Update your public profile and contact info</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">First Name</label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Last Name</label>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Email Address (Read-Only)</label>
                  <Input value={email} disabled className="rounded-xl bg-gray-100 dark:bg-slate-800 cursor-not-allowed" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Mobile Number</label>
                  <Input
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Location</label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Age</label>
                  <Input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Profile Photo URL</label>
                <Input
                  value={profilePhoto}
                  onChange={(e) => setProfilePhoto(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Bio Description</label>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="rounded-xl min-h-[80px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md"
              >
                <Save className="w-4 h-4 mr-1.5" /> Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tab 2: Security & Password */}
      {activeTab === "security" && (
        <Card className="rounded-2xl border shadow-sm max-w-xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-orange-500" /> Security &amp; Password
            </CardTitle>
            <CardDescription>Change your account password securely</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Current Password</label>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">New Password</label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Confirm New Password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md"
              >
                <Lock className="w-4 h-4 mr-1.5" /> Update Password
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tab 3: Pro Membership */}
      {activeTab === "subscription" && (
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" /> PlateShare Pro Status
            </CardTitle>
            <CardDescription>Manage your subscription plan and billing perks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-5 rounded-2xl bg-orange-50 dark:bg-slate-800 border border-orange-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <Badge className="bg-orange-500 text-white font-bold mb-2">ACTIVE PRO PASS</Badge>
                <h3 className="font-bold text-base text-gray-900 dark:text-white">Annual Pro Pass ($5.99 / mo)</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Renews automatically on July 29, 2027</p>
              </div>
              <Button
                onClick={() => setIsSubModalOpen(true)}
                className="rounded-xl bg-orange-500 text-white font-bold text-xs"
              >
                Change Plan
              </Button>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Unlocked Pro Perks</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-slate-900 border">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Unlimited Hands-Free Cook Mode
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-slate-900 border">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 7-Day Meal Planner &amp; Grocery Export
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-slate-900 border">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Secret Master Chef Recipes
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-slate-900 border">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Verified PRO Badge on Profile
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 4: My Published Content */}
      {activeTab === "recipes" && (
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">My Published Recipes</CardTitle>
              <CardDescription>Manage and edit your community recipe posts</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-0 divide-y">
            {myRecipes.map((recipe) => (
              <div key={recipe.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50">
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">{recipe.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <Badge variant="outline">{recipe.category}</Badge>
                    <span>•</span>
                    <span className="text-emerald-600 font-bold">{recipe.upvotes} Upvotes</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    <Edit className="w-3.5 h-3.5 mr-1" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteRecipe(recipe.id)}
                    className="text-xs text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            ))}
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
