"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

const demoPosts = [
  {
    id: 1,
    author: "Mahin Ahmed",
    content: "Just finished my new React project! 🎉",
    time: "2 hours ago",
  },
  {
    id: 2,
    author: "Sara Rahman",
    content: "Anyone here tried travelling to Cox's Bazar recently?",
    time: "5 hours ago",
  },
  {
    id: 3,
    author: "Jubayer Hasan",
    content: "What's your best productivity tool?",
    time: "Yesterday",
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen p-4 bg-gray-50 space-y-4">
      <h1 className="text-2xl font-bold">Community Feed</h1>

      {/* Posts */}
      {demoPosts.map((post) => (
        <Card key={post.id} className="border">
          <CardHeader>
            <CardTitle>{post.author}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{post.content}</p>
            <span className="text-gray-400 text-sm mt-2 block">
              {post.time}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
