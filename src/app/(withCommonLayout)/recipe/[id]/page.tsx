"use client";

import React, { useState } from "react";
import { useGetRecipeByIdQuery } from "@/src/redux/api/recipeApi";
import { useParams } from "next/navigation";

import { Clock, User, ChevronRight, Utensils, ImageIcon, ChefHat } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import CommentForm from "./component/CommentForm";
import { useGetAllCommentsQuery } from "@/src/redux/api/commentApi";
import CommentCard from "./component/CommentCard";
import RecipeDetailsSkeleton from "@/src/components/Recipe/Skeleton/RecipeDetailsSkeleton";
import NutritionCard from "@/src/components/Recipe/NutritionCard";
import PhotoReviewModal from "@/src/components/Recipe/PhotoReviewModal";
import { Camera, Star } from "lucide-react";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [cookModeOpen, setCookModeOpen] = useState(false);
  const [photoReviewOpen, setPhotoReviewOpen] = useState(false);
  const [userReviews, setUserReviews] = useState<
    Array<{ rating: number; comment: string; photoUrl: string; author: string }>
  >([
    {
      author: "Chef Sara",
      rating: 5,
      comment: "Turned out fantastic! The aromatic spices were spot on.",
      photoUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
    },
  ]);

  const {
    data: recipe,
    isLoading,
    error,
  } = useGetRecipeByIdQuery(id, {
    skip: !id,
  });

  const { data: allComments } = useGetAllCommentsQuery(id, { skip: !id });

  if (isLoading) {
    return <RecipeDetailsSkeleton />;
  }
  if (error) return <div>Failed to load recipe</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Title + Description + Cook Mode CTA */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{recipe.title}</h1>
          <p className="text-muted-foreground">{recipe.description}</p>

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge variant="secondary">{recipe.category}</Badge>
            <Badge>{recipe.recipeType}</Badge>
            <Badge>{recipe.recipeStatus}</Badge>
          </div>
        </div>

        {recipe.instructions?.length > 0 && (
          <Button
            size="lg"
            onClick={() => setCookModeOpen(true)}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold shadow-md self-start shrink-0"
          >
            <ChefHat className="w-5 h-5 mr-2" /> Start Cook Mode
          </Button>
        )}
      </div>

      {/* Image */}
      <div className="w-full overflow-hidden rounded-xl">
        {recipe.images?.length > 0 ? (
          <Image
            src={recipe.images[0]}
            alt={recipe.title}
            width={800}
            height={450}
            priority
            className="w-full h-72 sm:h-96 object-cover rounded-xl shadow-sm"
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
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="font-medium text-foreground">{recipe.cookingTime}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4 text-orange-500" />
            <span className="font-medium text-foreground">
              By {typeof recipe.author === "object" ? (recipe.author?.name || recipe.author?.email || "Community Chef") : "Community Chef"}
            </span>
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
            ),
          )}
        </CardContent>
      </Card>

      {/* Nutritional Breakdown Widget */}
      <NutritionCard
        ingredients={recipe.ingredients}
        recipeType={recipe.recipeType}
        category={recipe.category}
      />

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

      {/* "I Made This!" Photo Reviews Gallery & CTA */}
      <Card className="rounded-xl border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Camera className="w-5 h-5 text-orange-500" />
              "I Made This!" Photo Reviews
            </CardTitle>
            <CardDescription>Community photos and ratings for this dish</CardDescription>
          </div>
          <Button
            size="sm"
            onClick={() => setPhotoReviewOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold"
          >
            <Camera className="w-4 h-4 mr-1.5" /> Post My Photo
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {userReviews.map((rev, index) => (
              <div
                key={index}
                className="p-3 border rounded-xl bg-gray-50/50 flex items-start gap-3"
              >
                {rev.photoUrl && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 relative bg-gray-200 border">
                    <Image
                      src={rev.photoUrl}
                      alt="User dish"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs text-gray-900">{rev.author}</span>
                    <div className="flex items-center text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Created & Updated */}
      <div className="text-xs text-muted-foreground text-center py-4">
        Created: {new Date(recipe.createdAt).toLocaleString()}
        <br />
        Updated: {new Date(recipe.updatedAt).toLocaleString()}
      </div>

      {/* Comment Section */}
      <CommentForm recipeId={recipe?._id} />
      {allComments ? (
        <CommentCard allComments={allComments} />
      ) : (
        <p>No comments found!!</p>
      )}

      {/* Fullscreen Hands-Free Cook Mode Modal */}
      {cookModeOpen && (
        <CookModeModal
          title={recipe.title}
          instructions={recipe.instructions || []}
          onClose={() => setCookModeOpen(false)}
        />
      )}

      {/* Photo Review Submission Modal */}
      {photoReviewOpen && (
        <PhotoReviewModal
          recipeTitle={recipe.title}
          onClose={() => setPhotoReviewOpen(false)}
          onSuccess={(newReview) => {
            setUserReviews([
              { ...newReview, author: "You (Community Chef)" },
              ...userReviews,
            ]);
          }}
        />
      )}
    </div>
  );
}
