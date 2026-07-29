"use client";

import React from "react";
import { UtensilsCrossed, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-300 px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
          <UtensilsCrossed className="w-4 h-4" /> About PlateShare
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">
          Connecting the World Through the Joy of Cooking
        </h1>
        <p className="text-base text-gray-500 leading-relaxed">
          PlateShare is a vibrant global community where passionate home cooks, professional chefs, and food enthusiasts gather to share recipes, discover AI pantry matches, and inspire one another.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Recipes", value: "25,000+" },
          { label: "Community Chefs", value: "150,000+" },
          { label: "Country Cuisines", value: "85+" },
          { label: "Recipe Reviews", value: "450,000+" },
        ].map((stat, idx) => (
          <Card key={idx} className="rounded-2xl border shadow-sm text-center p-4">
            <CardContent className="p-2 space-y-1">
              <p className="text-2xl font-extrabold text-orange-500">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Core Pillars */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Our Core Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-2xl border shadow-sm p-5 space-y-3">
            <div className="p-3 bg-orange-100 text-orange-600 w-fit rounded-xl">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">Culinary Inclusivity</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We believe food brings people together regardless of background or skill level. Every kitchen story matters.
            </p>
          </Card>

          <Card className="rounded-2xl border shadow-sm p-5 space-y-3">
            <div className="p-3 bg-emerald-100 text-emerald-600 w-fit rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">Smart AI Cooking</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Empowering users with AI pantry matching, substitution suggestions, and automatic meal planning to reduce food waste.
            </p>
          </Card>

          <Card className="rounded-2xl border shadow-sm p-5 space-y-3">
            <div className="p-3 bg-blue-100 text-blue-600 w-fit rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">Trusted Quality</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Community-tested recipes with verified photo reviews (&quot;I Made This!&quot;) ensure every meal comes out delicious.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
