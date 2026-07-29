"use client";

import React from "react";
import { BookOpen, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import Image from "next/image";

const ARTICLES = [
  {
    title: "10 Essential Kitchen Knife Skills Every Home Cook Should Master",
    excerpt: "Learn how to hold, chop, slice, and dice like a professional chef to double your cooking speed and safety.",
    category: "Kitchen Basics",
    readTime: "5 min read",
    date: "July 24, 2026",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600",
  },
  {
    title: "The Science of Maillard Reaction: How to Get the Perfect Steak Sear",
    excerpt: "Uncover the chemistry behind golden crusts, caramelization, and deep savory flavors in cast-iron cooking.",
    category: "Food Science",
    readTime: "8 min read",
    date: "July 20, 2026",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600",
  },
  {
    title: "Zero-Waste Cooking: Transforming Leftover Vegetable Scraps Into Golden Broth",
    excerpt: "Don't toss those onion skins or celery tops! Turn kitchen scraps into aromatic, gut-healthy homemade stocks.",
    category: "Sustainability",
    readTime: "6 min read",
    date: "July 15, 2026",
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600",
  },
];

export default function CulinaryBlogPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-5xl">
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex items-center justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-amber-200" />
            PlateShare Digest
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Culinary Blog &amp; Guides</h1>
          <p className="text-sm text-orange-100 max-w-xl">
            Pro tips, knife skills, food science breakdowns, and kitchen techniques to level up your home cooking.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ARTICLES.map((art, idx) => (
          <Card key={idx} className="rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition flex flex-col justify-between">
            <div className="h-44 relative bg-gray-100">
              <Image src={art.image} alt={art.title} fill className="object-cover" />
            </div>

            <CardContent className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] font-bold text-orange-600 border-orange-200">
                    {art.category}
                  </Badge>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {art.readTime}
                  </span>
                </div>
                <h3 className="font-bold text-base text-gray-900 leading-snug line-clamp-2">
                  {art.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-2 border-t flex items-center justify-between text-xs text-orange-600 font-bold cursor-pointer hover:underline">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
