"use client";

import { useGetRecipeByIdQuery } from "@/src/redux/api/recipeApi";
import { useParams } from "next/navigation";

import { Clock, User, ChevronRight, Utensils, ImageIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import Image from "next/image";

export default function RecipeDetailPage() {
  const { id } = useParams();

  // console.log(id);

  const {
    data: recipe,
    isLoading,
    error,
  } = useGetRecipeByIdQuery(id, {
    skip: !id,
  });

  console.log(recipe);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load recipe</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Title + Description */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{recipe.title}</h1>
        <p className="text-muted-foreground">{recipe.description}</p>

        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <Badge variant="secondary">{recipe.category}</Badge>
          <Badge>{recipe.recipeType}</Badge>
          <Badge>{recipe.recipeStatus}</Badge>
        </div>
      </div>

      {/* Image */}
      <div className="w-full">
        {recipe.images?.length > 0 ? (
          <Image
            src={recipe.images[0]}
            alt={recipe.title}
            width={100}
            height={100}
          />
        ) : (
          <div className="w-full h-64 bg-muted rounded-xl flex items-center justify-center">
            <ImageIcon className="w-10 h-10 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Meta info */}
      <Card className="rounded-xl border">
        <CardContent className="p-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {recipe.cookingTime}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            Author ID: {recipe.author._id}
          </div>
        </CardContent>
      </Card>

      {/* Ingredients */}
      <Card className="rounded-xl border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="w-5 h-5" />
            Ingredients
          </CardTitle>
          <CardDescription>Everything you need</CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          {recipe.ingredients.map(
            (item: { name: string; quantity: string }, index: number) => (
              <div
                key={index}
                className="flex justify-between p-3 rounded-lg bg-muted/40"
              >
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground">{item.quantity}</span>
              </div>
            )
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="rounded-xl border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChevronRight className="w-5 h-5" />
            Instructions
          </CardTitle>
          <CardDescription>Step-by-step guide</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {recipe.instructions.map((step: { step: string }, index: number) => (
            <div key={index} className="p-3 bg-muted/30 rounded-lg">
              <p className="font-medium">Step {index + 1}</p>
              <p className="text-muted-foreground text-sm">{step?.step}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Created & Updated */}
      <div className="text-xs text-muted-foreground text-center py-4">
        Created: {new Date(recipe.createdAt).toLocaleString()}
        <br />
        Updated: {new Date(recipe.updatedAt).toLocaleString()}
      </div>
    </div>
  );
}
