"use client";

import React from "react";
import {
  Users,
  Utensils,
  Crown,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Users", value: "1,248", change: "+12% this month", icon: Users, color: "text-blue-600 bg-blue-50" },
    { title: "Total Recipes", value: "3,890", change: "+24% this month", icon: Utensils, color: "text-orange-600 bg-orange-50" },
    { title: "Premium Members", value: "342", change: "+18% conversion", icon: Crown, color: "text-amber-600 bg-amber-50" },
    { title: "Platform Engagement", value: "94.2%", change: "+4.1% retention", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
  ];

  const pendingApprovals = [
    { id: "1", title: "Traditional Beef Kala Bhuna", author: "chef_karim@gmail.com", category: "LUNCH", status: "PENDING" },
    { id: "2", title: "Keto Friendly Coconut Smoothie", author: "health_fit@gmail.com", category: "BREAKFAST", status: "PENDING" },
    { id: "3", title: "Authentic Mango Pickle", author: "grandma_recipes@gmail.com", category: "SNACK", status: "PENDING" },
  ];

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Control Panel</h1>
        <p className="text-sm text-gray-500 mt-1">
          Monitor system metrics, review recipe submissions, and manage user accounts.
        </p>
      </div>

      {/* Analytics Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="border shadow-sm">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                  <p className="text-xs text-emerald-600 mt-1 font-medium">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <Icon size={22} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Moderation & Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Recipe Moderation */}
        <Card className="lg:col-span-2 border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <ShieldCheck size={20} className="text-orange-500" />
                Recipe Moderation Queue
              </CardTitle>
              <p className="text-xs text-gray-500 mt-0.5">
                Review community submissions before public listing
              </p>
            </div>
            <Badge variant="secondary">3 Pending</Badge>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-gray-100">
            {pendingApprovals.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50">
                <div className="space-y-1">
                  <p className="font-medium text-sm text-gray-900">{item.title}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{item.author}</span>
                    <span>•</span>
                    <Badge variant="outline" className="text-xs">{item.category}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                    <CheckCircle2 size={16} className="mr-1" /> Approve
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    <XCircle size={16} className="mr-1" /> Reject
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick System Actions */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle size={20} className="text-amber-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start text-sm">
              <Users size={16} className="mr-2 text-blue-500" /> Manage User Roles
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm">
              <Utensils size={16} className="mr-2 text-orange-500" /> Manage Categories
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm">
              <Crown size={16} className="mr-2 text-amber-500" /> Subscription Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
