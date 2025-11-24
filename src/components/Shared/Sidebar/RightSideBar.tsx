"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Image from "next/image";

const RightSidebar = () => {
  const trendingRecipes = [
    {
      title: "Creamy Butter Chicken",
      img: "https://shorturl.at/kCbWs",
      likes: 1200,
    },
    {
      title: "Spicy Ramen Bowl",
      img: "https://shorturl.at/TzV67",
      likes: 980,
    },
    {
      title: "Fresh Avocado Toast",
      img: "https://shorturl.at/wHZK2",
      likes: 750,
    },
  ];

  return (
    <aside className="hidden lg:block lg:col-span-3 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto space-y-4 pl-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            🔥 Trending Recipes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trendingRecipes.map((recipe) => (
            <div key={recipe.title} className="flex gap-3 items-center">
              <Image
                src={recipe.img}
                alt={recipe.title}
                width={60}
                height={60}
                loading="lazy"
                className="rounded-md object-cover"
              />
              <div>
                <p className="text-sm font-semibold">{recipe.title}</p>
                <p className="text-xs text-muted-foreground">
                  {recipe.likes} likes
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
};

export default RightSidebar;
