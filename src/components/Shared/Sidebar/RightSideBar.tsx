"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flame, Trophy, Clock, Star, Crown, ArrowRight, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import SubscriptionModal from "@/src/components/Subscription/SubscriptionModal";
import WeeklyChallengeCard from "@/src/components/Community/WeeklyChallengeCard";

const RightSidebar = () => {
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  const trendingRecipes = [
    {
      id: "1",
      title: "Creamy Tuscan Garlic Chicken",
      category: "DINNER",
      time: "25 min",
      likes: 1240,
      rating: 4.9,
      img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400",
    },
    {
      id: "2",
      title: "Authentic Tonkotsu Ramen",
      category: "LUNCH",
      time: "45 min",
      likes: 980,
      rating: 5.0,
      img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
    },
    {
      id: "3",
      title: "Berry Honey Granola Bowl",
      category: "BREAKFAST",
      time: "10 min",
      likes: 850,
      rating: 4.8,
      img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400",
    },
  ];

  return (
    <aside className="hidden lg:block lg:col-span-3 sticky top-20 h-[calc(100vh-100px)] overflow-y-auto space-y-4 pl-1 scrollbar-thin">
      {/* PlateShare Pro Banner */}
      <Card className="rounded-2xl border-0 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white p-4 space-y-3 shadow-lg shadow-orange-500/10">
        <div className="flex items-center justify-between">
          <Badge className="bg-white/20 text-white border-0 text-[10px] font-extrabold uppercase">
            PRO Membership
          </Badge>
          <Crown className="w-5 h-5 text-amber-200" />
        </div>
        <div>
          <h3 className="font-extrabold text-base">Unlock PlateShare Pro</h3>
          <p className="text-xs text-orange-100 mt-1 leading-snug">
            Get hands-free cook mode, unlimited meal plan exports &amp; secret chef recipes.
          </p>
        </div>
        <Button
          onClick={() => setIsSubModalOpen(true)}
          className="w-full rounded-xl bg-white text-orange-600 hover:bg-orange-50 font-bold text-xs shadow-md"
        >
          Upgrade to Pro ($9.99/mo)
        </Button>
      </Card>

      {/* Trending Recipes Widget */}
      <Card className="rounded-2xl border shadow-xs bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
        <CardHeader className="py-3 px-4 border-b border-gray-100 dark:border-slate-800 flex flex-row items-center justify-between">
          <CardTitle className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-500" /> Trending Dishes
          </CardTitle>
          <Link href="/recipes/popular" className="text-[11px] font-bold text-orange-500 hover:underline">
            View All
          </Link>
        </CardHeader>

        <CardContent className="p-3 space-y-3">
          {trendingRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes`}
              className="flex gap-3 items-center group p-2 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-800 transition"
            >
              <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                <Image
                  src={recipe.img}
                  alt={recipe.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate group-hover:text-orange-500 transition">
                  {recipe.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1">
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-3 h-3" /> {recipe.time}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-amber-400" /> {recipe.rating}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Cooking Challenge */}
      <WeeklyChallengeCard />

      {/* Chef Spotlight */}
      <Card className="rounded-2xl border shadow-xs bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between border-b pb-2 border-gray-100 dark:border-slate-800">
          <span className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-500" /> Chef Spotlight
          </span>
          <Badge variant="outline" className="text-[9px] font-bold text-orange-600 border-orange-200">
            Top Rated
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-orange-400 shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300"
              alt="Chef Marco"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1">
              Chef Marco Rossi <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
            </h4>
            <p className="text-[10px] text-gray-400">14.2k followers • 84 recipes</p>
          </div>
        </div>

        <Link href="/community/chefs">
          <Button variant="outline" size="sm" className="w-full rounded-xl text-xs font-bold mt-1">
            View Chef Profile <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </Link>
      </Card>

      {/* Subscription Modal Trigger */}
      <SubscriptionModal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
      />
    </aside>
  );
};

export default RightSidebar;
