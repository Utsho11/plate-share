"use client";

import React from "react";
import { ChefHat, Star, UserPlus } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { toast } from "sonner";

const CHEFS = [
  {
    name: "Chef Marco Rossi",
    role: "Italian Cuisine Specialist",
    followers: "14.2k",
    recipes: 84,
    rating: 4.9,
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400",
    badge: "Master Chef",
  },
  {
    name: "Aisha Rahman",
    role: "Pastry Artist & Baker",
    followers: "9.8k",
    recipes: 62,
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
    badge: "Top Contributor",
  },
  {
    name: "Kenji Takahashi",
    role: "Ramen & Asian Street Food",
    followers: "22.5k",
    recipes: 110,
    rating: 5.0,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    badge: "Community Star",
  },
  {
    name: "Elena Rostova",
    role: "Plant-based & Nutrition Coach",
    followers: "11.1k",
    recipes: 49,
    rating: 4.7,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    badge: "Healthy Choice",
  },
];

export default function TopChefsPage() {
  const handleFollow = (name: string) => {
    toast.success(`You are now following ${name}!`);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-6xl">
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ChefHat className="w-4 h-4 text-amber-200" />
            Culinary Legends
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Top Community Chefs</h1>
          <p className="text-sm text-orange-100 max-w-xl">
            Follow premier home cooks and certified chefs to discover exclusive recipe releases and cooking secrets.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CHEFS.map((chef, idx) => (
          <Card key={idx} className="rounded-2xl border shadow-sm hover:shadow-md transition text-center overflow-hidden">
            <CardContent className="p-6 space-y-4">
              <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden border-4 border-orange-100 shadow-md">
                <Avatar className="w-full h-full">
                  <AvatarImage src={chef.avatar} />
                  <AvatarFallback>{chef.name[0]}</AvatarFallback>
                </Avatar>
              </div>

              <div>
                <Badge variant="outline" className="text-[10px] uppercase font-bold text-orange-600 border-orange-200 mb-1">
                  {chef.badge}
                </Badge>
                <h3 className="font-bold text-base text-gray-900">{chef.name}</h3>
                <p className="text-xs text-gray-500">{chef.role}</p>
              </div>

              <div className="grid grid-cols-3 gap-1 py-2 bg-gray-50 rounded-xl text-xs">
                <div>
                  <p className="font-bold text-gray-900">{chef.followers}</p>
                  <p className="text-[10px] text-gray-400">Followers</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">{chef.recipes}</p>
                  <p className="text-[10px] text-gray-400">Recipes</p>
                </div>
                <div>
                  <p className="font-bold text-amber-500 flex items-center justify-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400" /> {chef.rating}
                  </p>
                  <p className="text-[10px] text-gray-400">Rating</p>
                </div>
              </div>

              <Button
                onClick={() => handleFollow(chef.name)}
                className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs"
              >
                <UserPlus className="w-3.5 h-3.5 mr-1.5" /> Follow Chef
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
