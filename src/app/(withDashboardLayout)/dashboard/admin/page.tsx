"use client";

import React, { useState } from "react";
import {
  Users,
  Utensils,
  Crown,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Ban,
  Shield,
  UserCheck,
  Trash2,
  DollarSign,
  Search,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { toast } from "sonner";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"users" | "recipes" | "analytics">("users");
  const [userSearch, setUserSearch] = useState("");

  // Platform users mock state
  const [usersList, setUsersList] = useState([
    {
      id: "1",
      name: "PlateShare Admin",
      email: "admin@plateshare.com",
      role: "ADMIN",
      status: "ACTIVE",
      type: "PREMIUM",
      recipesCount: 0,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    },
    {
      id: "2",
      name: "Chef Marco Rossi",
      email: "marco@plateshare.com",
      role: "USER",
      status: "ACTIVE",
      type: "PREMIUM",
      recipesCount: 84,
      avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400",
    },
    {
      id: "3",
      name: "Aisha Rahman",
      email: "aisha@plateshare.com",
      role: "USER",
      status: "ACTIVE",
      type: "PREMIUM",
      recipesCount: 62,
      avatar: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
    },
    {
      id: "4",
      name: "Kenji Takahashi",
      email: "kenji@plateshare.com",
      role: "USER",
      status: "ACTIVE",
      type: "PREMIUM",
      recipesCount: 110,
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    },
    {
      id: "5",
      name: "Utsho Roy",
      email: "utsho@plateshare.com",
      role: "USER",
      status: "ACTIVE",
      type: "REGULAR",
      recipesCount: 14,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
    },
  ]);

  // Platform recipes moderation state
  const [recipesList, setRecipesList] = useState([
    {
      id: "101",
      title: "Creamy Tuscan Garlic Chicken",
      author: "marco@plateshare.com",
      category: "DINNER",
      status: "PREMIUM",
      approved: true,
    },
    {
      id: "102",
      title: "Traditional Beef Kala Bhuna",
      author: "chef_karim@gmail.com",
      category: "LUNCH",
      status: "REGULAR",
      approved: false,
    },
    {
      id: "103",
      title: "Keto Friendly Coconut Smoothie",
      author: "health_fit@gmail.com",
      category: "BREAKFAST",
      status: "REGULAR",
      approved: false,
    },
    {
      id: "104",
      title: "Authentic Tonkotsu Ramen Bowl",
      author: "kenji@plateshare.com",
      category: "LUNCH",
      status: "PREMIUM",
      approved: true,
    },
  ]);

  // User Actions
  const handleToggleUserStatus = (id: string, name: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    setUsersList((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u))
    );
    toast.success(`User ${name} has been ${newStatus.toLowerCase()}!`);
  };

  const handleToggleUserRole = (id: string, name: string, currentRole: string) => {
    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
    setUsersList((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
    toast.success(`User ${name} role updated to ${newRole}!`);
  };

  // Recipe Actions
  const handleApproveRecipe = (id: string, title: string) => {
    setRecipesList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved: true } : r))
    );
    toast.success(`Recipe "${title}" approved & published!`);
  };

  const handleDeleteRecipe = (id: string, title: string) => {
    setRecipesList((prev) => prev.filter((r) => r.id !== id));
    toast.success(`Recipe "${title}" removed from platform.`);
  };

  const handleToggleRecipeStatus = (id: string, title: string, currentStatus: string) => {
    const newStatus = currentStatus === "PREMIUM" ? "REGULAR" : "PREMIUM";
    setRecipesList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    toast.success(`Recipe "${title}" marked as ${newStatus}!`);
  };

  const filteredUsers = usersList.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Admin Control &amp; Platform Manager</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage registered accounts, moderate submitted recipes, and view revenue analytics.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 p-1 rounded-2xl">
          <Button
            size="sm"
            variant={activeTab === "users" ? "default" : "ghost"}
            onClick={() => setActiveTab("users")}
            className="text-xs font-bold rounded-xl"
          >
            <Users className="w-3.5 h-3.5 mr-1" /> User Management
          </Button>
          <Button
            size="sm"
            variant={activeTab === "recipes" ? "default" : "ghost"}
            onClick={() => setActiveTab("recipes")}
            className="text-xs font-bold rounded-xl"
          >
            <Utensils className="w-3.5 h-3.5 mr-1" /> Content Moderation
          </Button>
          <Button
            size="sm"
            variant={activeTab === "analytics" ? "default" : "ghost"}
            onClick={() => setActiveTab("analytics")}
            className="text-xs font-bold rounded-xl"
          >
            <TrendingUp className="w-3.5 h-3.5 mr-1" /> Revenue &amp; Stats
          </Button>
        </div>
      </div>

      {/* Analytics Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl border shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Total Users</p>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">{usersList.length} Accounts</h3>
              <p className="text-xs text-emerald-600 font-semibold mt-1">+12% this month</p>
            </div>
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
              <Users size={22} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Published Recipes</p>
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">3,890</h3>
              <p className="text-xs text-emerald-600 font-semibold mt-1">+24% this month</p>
            </div>
            <div className="p-3 rounded-2xl bg-orange-50 text-orange-600">
              <Utensils size={22} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Pro Subscribers</p>
              <h3 className="text-2xl font-extrabold text-amber-500 mt-1">342 Members</h3>
              <p className="text-xs text-amber-600 font-semibold mt-1">18% conversion rate</p>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
              <Crown size={22} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Est. Monthly Revenue</p>
              <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">$4,850.00</h3>
              <p className="text-xs text-emerald-600 font-semibold mt-1">+15.4% vs last month</p>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
              <DollarSign size={22} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab 1: User Management Portal */}
      {activeTab === "users" && (
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" /> User Account Management
              </CardTitle>
              <CardDescription>Manage user roles, grant admin permissions, or suspend accounts</CardDescription>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search user by name or email..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="pl-9 text-xs rounded-xl"
              />
            </div>
          </CardHeader>

          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400 font-bold uppercase border-y">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Account Type</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition">
                    <td className="p-4 flex items-center gap-3">
                      <Avatar className="w-9 h-9">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-[11px] text-gray-400">{user.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={user.role === "ADMIN" ? "default" : "outline"} className="text-[10px]">
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={user.type === "PREMIUM" ? "secondary" : "outline"} className="text-[10px]">
                        {user.type}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 font-bold text-[11px] ${
                        user.status === "ACTIVE" ? "text-emerald-600" : "text-red-600"
                      }`}>
                        {user.status === "ACTIVE" ? <UserCheck size={14} /> : <Ban size={14} />}
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleUserRole(user.id, user.name, user.role)}
                        className="text-[11px] h-8"
                      >
                        <Shield size={12} className="mr-1" /> {user.role === "ADMIN" ? "Demote" : "Make Admin"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleUserStatus(user.id, user.name, user.status)}
                        className={`text-[11px] h-8 ${
                          user.status === "ACTIVE" ? "text-red-600 border-red-200 hover:bg-red-50" : "text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                        }`}
                      >
                        {user.status === "ACTIVE" ? "Block" : "Unblock"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Tab 2: Content Moderation */}
      {activeTab === "recipes" && (
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-orange-500" /> Recipe Content Moderation
            </CardTitle>
            <CardDescription>Review, approve, or remove community-submitted recipes</CardDescription>
          </CardHeader>

          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400 font-bold uppercase border-y">
                <tr>
                  <th className="p-4">Recipe Title</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Tier</th>
                  <th className="p-4">Moderation State</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recipesList.map((recipe) => (
                  <tr key={recipe.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition">
                    <td className="p-4 font-bold text-gray-900 dark:text-white">{recipe.title}</td>
                    <td className="p-4 text-gray-500">{recipe.author}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-[10px]">{recipe.category}</Badge>
                    </td>
                    <td className="p-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleToggleRecipeStatus(recipe.id, recipe.title, recipe.status)}
                        className="text-[10px] h-7 font-bold text-amber-600"
                      >
                        {recipe.status}
                      </Button>
                    </td>
                    <td className="p-4">
                      <Badge variant={recipe.approved ? "default" : "secondary"} className="text-[10px]">
                        {recipe.approved ? "APPROVED" : "PENDING"}
                      </Badge>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {!recipe.approved && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApproveRecipe(recipe.id, recipe.title)}
                          className="text-[11px] h-8 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                        >
                          <CheckCircle2 size={14} className="mr-1" /> Approve
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteRecipe(recipe.id, recipe.title)}
                        className="text-[11px] h-8 text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 size={14} className="mr-1" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Tab 3: Revenue & Analytics */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="rounded-2xl border shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-500" /> Subscriptions Breakdown
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-slate-800">
                <span className="text-gray-600 dark:text-gray-300 font-semibold">Monthly Pass ($9.99/mo)</span>
                <span className="font-extrabold text-gray-900 dark:text-white">210 Subscribers</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-slate-800">
                <span className="text-gray-600 dark:text-gray-300 font-semibold">Annual Pass ($5.99/mo)</span>
                <span className="font-extrabold text-gray-900 dark:text-white">132 Subscribers</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                <span>Gross Revenue This Month</span>
                <span>$4,850.00 USD</span>
              </div>
            </div>
          </Card>

          <Card className="rounded-2xl border shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-orange-500" /> Platform Security Log
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-800 space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>User Account Created</span>
                  <span className="text-gray-400">10 mins ago</span>
                </div>
                <p className="text-gray-500">utsho@plateshare.com registered as REGULAR user.</p>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-slate-800 space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Recipe Approved</span>
                  <span className="text-gray-400">1 hour ago</span>
                </div>
                <p className="text-gray-500">&quot;Authentic Tonkotsu Ramen Bowl&quot; approved by Admin.</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
