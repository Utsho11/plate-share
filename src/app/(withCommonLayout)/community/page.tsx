"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { MessageSquare, Heart, Share2, Sparkles, Send } from "lucide-react";
import WeeklyChallengeCard from "@/src/components/Community/WeeklyChallengeCard";
import { toast } from "sonner";

const foodCommunityPosts = [
  {
    id: 1,
    author: "Chef Tanvir",
    avatar: "T",
    badge: "Master Chef",
    content: "Secret to crispier Kacchi Biryani potatoes: Parboil them with a pinch of saffron water and ghee before layering! What's your go-to biryani trick?",
    time: "2 hours ago",
    likes: 48,
    comments: 14,
    tags: ["#biryaniTips", "#bengaliCuisine"],
  },
  {
    id: 2,
    author: "Nusrat Jahan",
    avatar: "N",
    badge: "Home Cook",
    content: "Just tried the #30MinDinner challenge! Made Garlic Butter Shrimp with Basil Rice in exactly 22 minutes. Recipe coming to my feed soon 🍤✨",
    time: "4 hours ago",
    likes: 92,
    comments: 21,
    tags: ["#30MinDinner", "#quickMeals"],
  },
  {
    id: 3,
    author: "Rahim Chowdhury",
    avatar: "R",
    badge: "Baker",
    content: "Pro Tip: If your cake sinks in the middle, check your oven temperature accuracy with an external oven thermometer! Baking precision matters 🎂",
    time: "Yesterday",
    likes: 115,
    comments: 32,
    tags: ["#bakingTips", "#desserts"],
  },
];

export default function CommunityPage() {
  const [newPostText, setNewPostText] = useState("");
  const [posts, setPosts] = useState(foodCommunityPosts);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost = {
      id: Date.now(),
      author: "You (Community Chef)",
      avatar: "Y",
      badge: "Foodie",
      content: newPostText.trim(),
      time: "Just now",
      likes: 1,
      comments: 0,
      tags: ["#community"],
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");
    toast.success("Community post shared successfully!");
  };

  const handleLike = (id: number) => {
    setPosts(
      posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 my-4">
      {/* Page Title Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-orange-500" />
          Culinary Community Hub
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Connect with foodies, share cooking tips, and enter weekly cooking challenges.
        </p>
      </div>

      {/* Weekly Cooking Challenge Section */}
      <WeeklyChallengeCard />

      {/* Create New Post Widget */}
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <form onSubmit={handleCreatePost} className="space-y-3">
            <div className="flex items-start gap-3">
              <Avatar className="w-9 h-9 border">
                <AvatarFallback className="bg-orange-500 text-white font-bold text-sm">
                  Y
                </AvatarFallback>
              </Avatar>
              <textarea
                rows={2}
                placeholder="Share a cooking tip, recipe idea, or food question..."
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                className="w-full text-sm p-2.5 bg-gray-50 rounded-xl border border-transparent focus:border-orange-500 focus:bg-white focus:outline-none transition resize-none"
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold"
              >
                <Send className="w-3.5 h-3.5 mr-1.5" /> Share Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Community Feed Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="border shadow-sm hover:border-gray-300 transition">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback className="bg-orange-100 text-orange-600 font-bold text-base">
                    {post.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-semibold">{post.author}</CardTitle>
                    <Badge variant="secondary" className="text-[10px] py-0 px-2 font-normal">
                      {post.badge}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{post.time}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 pt-2 space-y-3">
              <p className="text-sm text-gray-800 leading-relaxed">{post.content}</p>

              {/* Tags */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs text-orange-600 font-medium hover:underline cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Like / Comment / Share */}
              <div className="flex items-center gap-6 pt-3 border-t text-xs text-gray-500">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1.5 hover:text-red-500 transition font-medium"
                >
                  <Heart className="w-4 h-4 text-red-500 fill-red-500/20" /> {post.likes} Likes
                </button>
                <button className="flex items-center gap-1.5 hover:text-orange-500 transition font-medium">
                  <MessageSquare className="w-4 h-4 text-orange-500" /> {post.comments} Comments
                </button>
                <button className="flex items-center gap-1.5 hover:text-gray-900 transition font-medium">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
