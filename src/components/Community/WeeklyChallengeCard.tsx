"use client";

import React, { useState } from "react";
import { Trophy, Flame, Users, Clock, Award, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { toast } from "sonner";

export default function WeeklyChallengeCard() {
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    setJoined(true);
    toast.success("Joined #30MinDinner Challenge! Post your recipe to compete.");
  };

  return (
    <Card className="border shadow-md bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white rounded-2xl overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1 font-semibold text-xs flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-200" /> Weekly Cooking Challenge
          </Badge>
          <span className="text-xs text-orange-100 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> 3 Days Left
          </span>
        </div>

        <CardTitle className="text-xl font-extrabold mt-3 text-white">
          #30MinDinner Challenge 🍳
        </CardTitle>
        <p className="text-xs text-orange-100 leading-relaxed">
          Create & publish your best gourmet dinner recipe that takes under 30 minutes!
        </p>
      </CardHeader>

      <CardContent className="space-y-4 pt-2">
        {/* Rewards & Participants */}
        <div className="grid grid-cols-2 gap-2 bg-black/15 p-3 rounded-xl backdrop-blur-xs text-xs">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-300 shrink-0" />
            <div>
              <p className="font-bold text-white">Top Chef Badge</p>
              <p className="text-[10px] text-orange-100">+500 Community XP</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-orange-200 shrink-0" />
            <div>
              <p className="font-bold text-white">342 Joined</p>
              <p className="text-[10px] text-orange-100">89 Dish Submissions</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={handleJoin}
          disabled={joined}
          className={`w-full font-bold shadow-sm ${
            joined
              ? "bg-emerald-500 hover:bg-emerald-600 text-white"
              : "bg-white text-orange-600 hover:bg-orange-50"
          }`}
        >
          {joined ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" /> Joined Challenge
            </>
          ) : (
            <>
              <Flame className="w-4 h-4 mr-2 text-orange-500" /> Enter Challenge
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
