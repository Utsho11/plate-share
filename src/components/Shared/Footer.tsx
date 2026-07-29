"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UtensilsCrossed, Heart, Mail, Github, Twitter, Instagram, Send } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Subscribed! Thank you for joining the PlateShare Newsletter.");
    setEmail("");
  };

  return (
    <footer className="bg-white dark:bg-slate-900 border-t mt-16 transition-colors">
      <div className="container mx-auto px-4 py-12 max-w-6xl space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex justify-center items-center border-2 border-black dark:border-white rounded-full w-9 h-9">
                <UtensilsCrossed className="w-5 h-5 text-gray-900 dark:text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                PlateShare
              </span>
            </Link>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              The ultimate recipe-sharing platform. Discover recipes, match pantry ingredients with AI, and plan weekly meals with ease.
            </p>
            <div className="flex items-center gap-3 text-gray-400">
              <Twitter className="w-4 h-4 hover:text-orange-500 cursor-pointer transition" />
              <Instagram className="w-4 h-4 hover:text-orange-500 cursor-pointer transition" />
              <Github className="w-4 h-4 hover:text-orange-500 cursor-pointer transition" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Explore Recipes
            </h4>
            <ul className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
              <li><Link href="/recipes" className="hover:text-orange-500 transition">All Recipes</Link></li>
              <li><Link href="/recipes/categories" className="hover:text-orange-500 transition">Categories &amp; Cuisines</Link></li>
              <li><Link href="/recipes/popular" className="hover:text-orange-500 transition">Popular &amp; Trending</Link></li>
              <li><Link href="/recipes/quick-and-easy" className="hover:text-orange-500 transition">Quick Under-30 Mins</Link></li>
              <li><Link href="/meal-planner" className="hover:text-orange-500 transition">7-Day Meal Planner</Link></li>
            </ul>
          </div>

          {/* Community Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Community &amp; Perks
            </h4>
            <ul className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
              <li><Link href="/community" className="hover:text-orange-500 transition">Culinary Feed</Link></li>
              <li><Link href="/community/chefs" className="hover:text-orange-500 transition">Top Community Chefs</Link></li>
              <li><Link href="/recipes/create" className="hover:text-orange-500 transition">Share a Recipe</Link></li>
              <li><Link href="/saved" className="hover:text-orange-500 transition">Saved Recipes</Link></li>
              <li><Link href="/blog" className="hover:text-orange-500 transition">Culinary Blog</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Weekly Recipe Digest
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Get the best weekly recipes, AI cooking tips, and meal planning guides directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl text-xs py-2 bg-gray-50 dark:bg-slate-800"
              />
              <Button
                type="submit"
                size="sm"
                className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs"
              >
                <Send className="w-3.5 h-3.5 mr-1.5" /> Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} PlateShare Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-gray-600 transition">About</Link>
            <Link href="/help" className="hover:text-gray-600 transition">Help &amp; FAQs</Link>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for food lovers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
