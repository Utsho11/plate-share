"use client";

import React from "react";
import { BookOpen, Clock, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { useGetAllBlogsQuery } from "@/src/redux/api/blogApi";

interface BlogArticle {
  _id: string;
  id?: string;
  title: string;
  content: string;
  category: string;
  coverImage?: string;
  createdAt?: string;
  author?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    profilePhoto?: string;
  };
}

export default function CulinaryBlogPage() {
  const { data: blogsData, isLoading } = useGetAllBlogsQuery({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const articles: BlogArticle[] = (blogsData?.data || []) as unknown as BlogArticle[];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-5xl">
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex items-center justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-amber-200" />
            PlateShare Digest
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Culinary Blog &amp; Guides</h1>
          <p className="text-sm text-orange-100 max-w-xl">
            Pro tips, knife skills, food science breakdowns, and kitchen techniques shared by our community.
          </p>
        </div>
        <Sparkles className="w-12 h-12 text-amber-200 hidden sm:block" />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
          <Loader2 size={24} className="animate-spin text-orange-500" />
          <span className="text-sm font-medium">Fetching culinary guides...</span>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto" />
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">No blog posts available yet</h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 max-w-sm mx-auto">
            Be the first to publish a guide or article! Log in and visit your user dashboard to share your culinary knowledge.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => {
            const authorName = art.author?.firstName
              ? `${art.author.firstName} ${art.author.lastName || ""}`.trim()
              : "Chef";
            const dateStr = art.createdAt
              ? new Date(art.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Recent";

            const coverImg =
              art.coverImage ||
              "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600";

            return (
              <Card
                key={art._id || art.id}
                className="rounded-2xl border dark:border-slate-800 dark:bg-slate-900 shadow-sm overflow-hidden hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="h-44 relative bg-gray-100 dark:bg-slate-800 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverImg}
                    alt={art.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>

                <CardContent className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="text-[10px] font-bold text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/50 uppercase"
                      >
                        {art.category?.replace("_", " ") || "General"}
                      </Badge>
                      <span className="text-[10px] text-gray-400 dark:text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {dateStr}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-gray-900 dark:text-white leading-snug line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-300 line-clamp-3 leading-relaxed">
                      {art.content}
                    </p>
                  </div>

                  <div className="pt-3 border-t dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={art.author?.profilePhoto} />
                        <AvatarFallback className="text-[9px] bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300">
                          {authorName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-200">
                        {authorName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400 font-bold hover:underline cursor-pointer">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
