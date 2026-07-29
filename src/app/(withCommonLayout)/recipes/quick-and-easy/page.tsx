"use client";

import React from "react";
import { Clock, Zap } from "lucide-react";
import RecipeFeed from "../../home/components/RecipeFeed";

export default function QuickAndEasyRecipesPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6 max-w-6xl">
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4 text-emerald-200" />
            Under 30 Minutes
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Quick &amp; Easy Meals</h1>
          <p className="text-sm text-emerald-100 max-w-xl">
            Short on time? Explore fast, simple, and incredibly flavorful dishes ready in 30 minutes or less!
          </p>
        </div>
        <div className="hidden sm:flex p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 items-center gap-3">
          <Clock className="w-10 h-10 text-emerald-200" />
        </div>
      </div>

      <RecipeFeed />
    </div>
  );
}
