"use client";

import RecipePreviewCard from "@/src/components/Recipe/RecipePreviewCard";
import RecipeCardSkeleton from "@/src/components/Recipe/Skeleton/RecipeCardSkeleton";
import { useGetAllRecipeQuery } from "@/src/redux/api/recipeApi";
import type { IRecipe } from "@/src/types";

const RecipeFeed = () => {
  const { data, isLoading } = useGetAllRecipeQuery({});

  // console.log({ data });

  return (
    <div>
      {isLoading && (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <RecipeCardSkeleton key={index} />
          ))}
        </>
      )}
      {data?.recipies.map((recipe: IRecipe) => (
        <RecipePreviewCard key={recipe._id} data={recipe} />
      ))}
      {/* <RecipePreviewCard data={data}/> */}
    </div>
  );
};

export default RecipeFeed;
